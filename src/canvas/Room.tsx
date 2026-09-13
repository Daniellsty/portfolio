import { RoundedBox, Text } from '@react-three/drei'
import { useMemo } from 'react'
import { COPY } from '../data/portfolio'
import { getParquetTexture } from '../lib/parquetTexture'
import { MonitorScreen, WallPhotos } from './Photos'

const WALL = '#7d7494'
const WHITE = '#f5f5f7'
const SILVER = '#d4d4d8'
const CHROME = '#c0c4cc'
const SEAT = '#2a2a2e'
const DESK = '#efe8dc'
const DESK_LEG = '#e0d6c8'
const PAPER = '#f7f4ef'
const GRAYS = ['#6b7280', '#78716c', '#57534e', '#9ca3af', '#737373', '#a8a29e', '#52525b']

function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function WhiteKeyboard() {
  const keyW = 0.048
  const keyD = 0.045
  const keyH = 0.014
  const rows: Array<{ z: number; keys: string[]; offset: number }> = [
    { z: -0.075, offset: -0.302, keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'] },
    { z: -0.02, offset: -0.275, keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"] },
    { z: 0.035, offset: -0.248, keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'] },
  ]

  return (
    <group position={[0.02, 0.79, 0.18]} rotation={[-0.08, 0, 0]}>
      <RoundedBox args={[0.78, 0.035, 0.3]} radius={0.012} position={[0, 0.02, 0]}>
        <meshStandardMaterial color="#f7f7f9" roughness={0.32} metalness={0.04} />
      </RoundedBox>
      <RoundedBox args={[0.76, 0.012, 0.28]} radius={0.008} position={[0, 0.004, 0]}>
        <meshStandardMaterial color="#ebebef" roughness={0.4} />
      </RoundedBox>

      {rows.map((row, ri) =>
        row.keys.map((label, i) => {
          const x = row.offset + i * 0.055
          return (
            <group key={`${ri}-${label}`} position={[x, 0.045, row.z]}>
              <RoundedBox args={[keyW, keyH, keyD]} radius={0.004}>
                <meshStandardMaterial color="#ffffff" roughness={0.28} metalness={0.05} />
              </RoundedBox>
              <Text
                position={[0, keyH / 2 + 0.001, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.016}
                color="#3f3f46"
                anchorX="center"
                anchorY="middle"
              >
                {label}
              </Text>
            </group>
          )
        }),
      )}

      <group position={[0, 0.045, 0.09]}>
        <RoundedBox args={[0.28, keyH, 0.04]} radius={0.005}>
          <meshStandardMaterial color="#ffffff" roughness={0.28} metalness={0.05} />
        </RoundedBox>
        <Text
          position={[0, keyH / 2 + 0.001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.012}
          color="#3f3f46"
          anchorX="center"
          anchorY="middle"
        >
          space
        </Text>
      </group>
    </group>
  )
}

function WhiteMouse() {
  return (
    <group position={[0.55, 0.79, 0.2]} rotation={[0, -0.25, 0]}>
      <mesh position={[0, 0.028, 0]} scale={[0.9, 0.55, 1.15]}>
        <sphereGeometry args={[0.055, 24, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.06} />
      </mesh>
      <mesh position={[0, 0.022, 0.04]} scale={[0.7, 0.4, 0.55]}>
        <sphereGeometry args={[0.05, 20, 14]} />
        <meshStandardMaterial color="#fafafa" roughness={0.28} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.048, -0.005]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.022, 16]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh position={[-0.038, 0.025, 0]} scale={[0.25, 0.45, 0.7]}>
        <sphereGeometry args={[0.04, 12, 10]} />
        <meshStandardMaterial color="#f2f2f5" roughness={0.3} />
      </mesh>
    </group>
  )
}

function TrashBin() {
  const barCount = 20
  const radius = 0.16
  const barH = 0.5

  return (
    <group position={[-2.15, 0, -2.4]}>
      {/* Vertical metal rods */}
      {Array.from({ length: barCount }).map((_, i) => {
        const a = (i / barCount) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * radius, 0.28, Math.sin(a) * radius]}
          >
            <cylinderGeometry args={[0.008, 0.008, barH, 8]} />
            <meshStandardMaterial color="#9ca3af" metalness={0.75} roughness={0.28} />
          </mesh>
        )
      })}

      {/* Horizontal rings */}
      {[0.06, 0.28, 0.5].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.009, 8, 32]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Base disc */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius + 0.01, 28]} />
        <meshStandardMaterial color="#52525b" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Trash visible inside */}
      <mesh position={[-0.03, 0.2, 0.02]} rotation={[0.4, 0.3, 0.2]}>
        <boxGeometry args={[0.09, 0.06, 0.07]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.9} />
      </mesh>
      <mesh position={[0.04, 0.16, -0.03]} rotation={[-0.3, 0.6, 0.5]}>
        <boxGeometry args={[0.07, 0.05, 0.06]} />
        <meshStandardMaterial color="#e5e7eb" roughness={0.9} />
      </mesh>
      <mesh position={[0.01, 0.26, 0.01]} rotation={[0.8, -0.4, 0.1]}>
        <sphereGeometry args={[0.04, 10, 8]} />
        <meshStandardMaterial color="#fafafa" roughness={0.95} />
      </mesh>
    </group>
  )
}

function Desk() {
  // Left + flush against back wall
  return (
    <group position={[-0.65, 0, -2.48]}>
      <RoundedBox args={[2.7, 0.08, 1.15]} radius={0.02} position={[0, 0.74, 0]}>
        <meshStandardMaterial color={DESK} roughness={0.48} metalness={0.02} />
      </RoundedBox>

      {(
        [
          [-1.15, 0.36, 0.45],
          [1.15, 0.36, 0.45],
          [-1.15, 0.36, -0.45],
          [1.15, 0.36, -0.45],
        ] as const
      ).map((pos, i) => (
        <RoundedBox key={i} args={[0.08, 0.72, 0.08]} radius={0.015} position={[...pos]}>
          <meshStandardMaterial color={DESK_LEG} roughness={0.55} />
        </RoundedBox>
      ))}

      <group position={[-0.1, 0.78, -0.28]}>
        <RoundedBox args={[1.72, 0.78, 0.028]} radius={0.012} position={[0, 0.48, 0]}>
          <meshStandardMaterial color="#1c1c1e" roughness={0.28} metalness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0.48, -0.002]}>
          <boxGeometry args={[1.74, 0.8, 0.01]} />
          <meshStandardMaterial color="#d1d5db" roughness={0.25} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.48, 0.016]}>
          <planeGeometry args={[1.64, 0.74]} />
          <meshBasicMaterial color="#a8c8ff" transparent opacity={0.22} />
        </mesh>
        <group position={[0, 0.48, 0.018]}>
          <MonitorScreen />
        </group>
        <mesh position={[0, 0.05, 0.01]}>
          <boxGeometry args={[0.055, 0.16, 0.04]} />
          <meshStandardMaterial color="#c5c9d0" metalness={0.65} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.02, 0.05]} rotation={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.2, 0.02, 32]} />
          <meshStandardMaterial color="#c5c9d0" metalness={0.65} roughness={0.22} />
        </mesh>
        <pointLight position={[0, 0.45, 0.4]} intensity={0.9} color="#e8f0ff" distance={3.8} decay={2} />
      </group>

      <WhiteKeyboard />
      <WhiteMouse />

      <group position={[1.05, 0.785, 0.08]} rotation={[0, -0.35, 0]}>
        <RoundedBox args={[0.5, 0.02, 0.34]} radius={0.01} position={[0, 0.012, 0]}>
          <meshStandardMaterial color={SILVER} roughness={0.28} metalness={0.45} />
        </RoundedBox>
      </group>
    </group>
  )
}

function OfficeChair() {
  return (
    <group position={[-0.65, 0, -1.55]}>
      <RoundedBox args={[0.62, 0.08, 0.58]} radius={0.04} position={[0, 0.48, 0]}>
        <meshStandardMaterial color={SEAT} roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.6, 0.72, 0.08]} radius={0.04} position={[0, 0.9, 0.28]}>
        <meshStandardMaterial color={SEAT} roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.06, 0.42]} radius={0.02} position={[-0.34, 0.62, 0]}>
        <meshStandardMaterial color={CHROME} metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.06, 0.42]} radius={0.02} position={[0.34, 0.62, 0]}>
        <meshStandardMaterial color={CHROME} metalness={0.7} roughness={0.25} />
      </RoundedBox>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.04, 0.045, 0.36, 16]} />
        <meshStandardMaterial color={CHROME} metalness={0.8} roughness={0.2} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <group key={i} rotation={[0, a, 0]}>
            <mesh position={[0.22, 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              <meshStandardMaterial color={CHROME} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.4, 0.06, 0]}>
              <sphereGeometry args={[0.045, 12, 12]} />
              <meshStandardMaterial color="#52525b" roughness={0.4} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

/** Intro copy on back wall — clearly above the floating shelf */
function IntroWallText() {
  return (
    <group position={[-0.7, 3.35, -3.08]}>
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.125}
        color="#f5f5f7"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.4}
        textAlign="center"
      >
        {COPY.heroLine1}
      </Text>
      <Text
        position={[-0.78, -0.06, 0]}
        fontSize={0.15}
        color="#f5f5f7"
        anchorX="left"
        anchorY="middle"
      >
        {COPY.heroLine2Before}
      </Text>
      <Text
        position={[-0.22, -0.06, 0]}
        fontSize={0.155}
        color="#e8c547"
        anchorX="left"
        anchorY="middle"
        fontStyle="italic"
      >
        {COPY.heroLine2Accent}
      </Text>
      <Text
        position={[0.42, -0.06, 0]}
        fontSize={0.15}
        color="#f5f5f7"
        anchorX="left"
        anchorY="middle"
      >
        {COPY.heroLine2After}
      </Text>
    </group>
  )
}

function ShelfBook({
  x,
  lean,
  color,
  height,
  thickness,
}: {
  x: number
  lean: number
  color: string
  height: number
  thickness: number
}) {
  const yLift = Math.abs(Math.sin(lean)) * thickness * 0.35
  return (
    <group position={[x, 0.026 + yLift, 0]} rotation={[0, 0, lean]}>
      {/* Single solid cover — avoids z-fighting flicker */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[thickness, height, 0.15]} />
        <meshStandardMaterial
          color={color}
          roughness={0.62}
          metalness={0.02}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      {/* Paper edge only on the front, clearly offset */}
      <mesh position={[0, height / 2, 0.078]}>
        <boxGeometry args={[thickness * 0.72, height * 0.88, 0.008]} />
        <meshStandardMaterial color={PAPER} roughness={0.92} />
      </mesh>
    </group>
  )
}

function FloatingShelf() {
  // Spaced so covers never intersect (no flicker)
  const books = [
    { x: -0.58, lean: 0, color: '#4b5563', height: 0.22, thickness: 0.038 },
    { x: -0.52, lean: 0, color: '#6b7280', height: 0.2, thickness: 0.036 },
    { x: -0.44, lean: -0.38, color: '#1e3a5f', height: 0.24, thickness: 0.042 },
    { x: -0.34, lean: 0, color: '#78716c', height: 0.18, thickness: 0.036 },
    { x: -0.28, lean: 0.03, color: '#57534e', height: 0.21, thickness: 0.038 },
    { x: -0.2, lean: 0.4, color: '#334155', height: 0.23, thickness: 0.04 },
    { x: -0.1, lean: 0, color: '#52525b', height: 0.19, thickness: 0.036 },
    { x: -0.04, lean: -0.04, color: '#3f3f46', height: 0.25, thickness: 0.042 },
  ]

  return (
    <group position={[-0.55, 2.42, -3.02]}>
      <RoundedBox args={[1.55, 0.045, 0.22]} radius={0.01}>
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </RoundedBox>

      {books.map((book, i) => (
        <ShelfBook key={i} {...book} />
      ))}

      {/* Small plant with long stems */}
      <group position={[0.52, 0.02, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.055, 0.045, 0.09, 16]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.095, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
          <meshStandardMaterial color="#44403c" roughness={0.9} />
        </mesh>

        {/* Long stems */}
        {(
          [
            [0.01, 0.12, 0, 0.22, 0.25, 0.1],
            [-0.02, 0.12, 0.015, 0.2, -0.35, 0.15],
            [0.025, 0.12, -0.01, 0.26, 0.45, -0.2],
            [-0.01, 0.12, -0.02, 0.18, -0.2, -0.35],
          ] as const
        ).map(([sx, sy, sz, len, rx, rz], i) => (
          <group key={i} position={[sx, sy, sz]} rotation={[rx, 0, rz]}>
            <mesh position={[0, len / 2, 0]}>
              <cylinderGeometry args={[0.005, 0.007, len, 6]} />
              <meshStandardMaterial color="#166534" roughness={0.7} />
            </mesh>
            <mesh position={[0, len + 0.02, 0]} scale={[0.55, 1.15, 0.35]}>
              <sphereGeometry args={[0.035, 10, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#22c55e' : '#16a34a'} roughness={0.65} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}

function Book({
  shelfY,
  z,
  seed,
}: {
  shelfY: number
  z: number
  seed: number
}) {
  const r = seeded(seed)
  const r2 = seeded(seed + 17)
  const thickness = 0.07 + r * 0.05
  const height = 0.22 + r2 * 0.08
  const depth = 0.2 + seeded(seed + 3) * 0.04
  const gray = GRAYS[Math.floor(r * GRAYS.length)]
  // random lean — some upright, some tilted
  const lean = r > 0.55 ? (r2 - 0.5) * 0.45 : (r2 - 0.5) * 0.08
  const yLift = Math.abs(Math.sin(lean)) * thickness * 0.15

  return (
    <group position={[0.03, shelfY + yLift, z]} rotation={[0, 0, lean]}>
      {/* paper block (pages) */}
      <mesh position={[0.02, height / 2, 0]}>
        <boxGeometry args={[depth * 0.85, height * 0.9, thickness * 0.78]} />
        <meshStandardMaterial color={PAPER} roughness={0.9} />
      </mesh>
      {/* spine / cover */}
      <mesh position={[-0.01, height / 2, 0]}>
        <boxGeometry args={[0.025, height, thickness]} />
        <meshStandardMaterial color={gray} roughness={0.7} />
      </mesh>
      {/* front cover */}
      <mesh position={[0.05, height / 2, thickness * 0.42]}>
        <boxGeometry args={[depth * 0.9, height, 0.012]} />
        <meshStandardMaterial color={gray} roughness={0.7} />
      </mesh>
      {/* back cover */}
      <mesh position={[0.05, height / 2, -thickness * 0.42]}>
        <boxGeometry args={[depth * 0.9, height, 0.012]} />
        <meshStandardMaterial color={gray} roughness={0.7} />
      </mesh>
    </group>
  )
}

function Bookshelf() {
  const columns = 4
  const shelves = [0.04, 0.42, 0.8]
  const width = 2.4
  const colW = width / columns

  const books = useMemo(() => {
    const list: Array<{ shelfY: number; z: number; seed: number; key: string }> = []
    let seed = 1
    shelves.forEach((shelfY, row) => {
      for (let col = 0; col < columns; col++) {
        const colStart = -width / 2 + 0.08 + col * colW
        const colEnd = colStart + colW - 0.12
        let z = colStart + 0.04
        while (z < colEnd) {
          const t = 0.07 + seeded(seed) * 0.05
          list.push({ shelfY, z: z + t / 2, seed, key: `${row}-${col}-${seed}` })
          z += t + 0.012 + seeded(seed + 9) * 0.02
          seed += 1
        }
      }
    })
    return list
  }, [])

  return (
    <group position={[-3.02, 0, -0.4]}>
      {/* back */}
      <mesh position={[-0.16, 0.6, 0]}>
        <boxGeometry args={[0.04, 1.2, width + 0.08]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      {/* outer sides */}
      <mesh position={[0, 0.6, -width / 2]}>
        <boxGeometry args={[0.34, 1.2, 0.04]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.6, width / 2]}>
        <boxGeometry args={[0.34, 1.2, 0.04]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      {/* column dividers */}
      {Array.from({ length: columns - 1 }).map((_, i) => {
        const z = -width / 2 + (i + 1) * colW
        return (
          <mesh key={i} position={[0, 0.6, z]}>
            <boxGeometry args={[0.32, 1.16, 0.03]} />
            <meshStandardMaterial color={WHITE} roughness={0.4} />
          </mesh>
        )
      })}
      {/* top / bottom */}
      <mesh position={[0, 1.18, 0]}>
        <boxGeometry args={[0.34, 0.04, width + 0.08]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.34, 0.04, width + 0.08]} />
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </mesh>
      {/* shelf boards */}
      {[0.4, 0.78].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[0.32, 0.03, width]} />
          <meshStandardMaterial color={WHITE} />
        </mesh>
      ))}

      {books.map((book) => (
        <Book key={book.key} shelfY={book.shelfY} z={book.z} seed={book.seed} />
      ))}
    </group>
  )
}

function ParquetFloor() {
  const map = useMemo(() => getParquetTexture(), [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial
        map={map}
        color="#f7f3ec"
        roughness={0.62}
        metalness={0}
        envMapIntensity={0.35}
      />
    </mesh>
  )
}

export function Room() {
  return (
    <group>
      <ParquetFloor />

      <mesh position={[0, 2.45, -3.2]}>
        <boxGeometry args={[7.2, 4.9, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>

      <mesh position={[-3.25, 2.45, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6.5, 4.9, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>

      <mesh position={[3.45, 2.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[6.5, 4.9, 0.12]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>

      <WallPhotos />
      <IntroWallText />
      <FloatingShelf />
      <Bookshelf />
      <Desk />
      <TrashBin />
      <OfficeChair />

      {/* Sofa */}
      <group position={[2.35, 0.38, 0.25]}>
        <RoundedBox args={[1.9, 0.4, 0.8]} radius={0.05}>
          <meshStandardMaterial color="#5a3d78" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[1.9, 0.48, 0.12]} radius={0.04} position={[0, 0.26, -0.34]}>
          <meshStandardMaterial color="#5a3d78" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.38, 0.2, 0.1]} radius={0.03} position={[-0.4, 0.4, -0.24]}>
          <meshStandardMaterial color="#f3f3f3" />
        </RoundedBox>
        <RoundedBox args={[0.38, 0.2, 0.1]} radius={0.03} position={[0.08, 0.4, -0.24]}>
          <meshStandardMaterial color="#f3f3f3" />
        </RoundedBox>
      </group>
    </group>
  )
}
