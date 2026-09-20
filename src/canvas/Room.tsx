import { RoundedBox, Text } from '@react-three/drei'
import { useMemo } from 'react'
import { COPY } from '../data/portfolio'
import { getParquetTexture } from '../lib/parquetTexture'
import { IPhonePro } from './IPhone'
import { OceanWindow } from './OceanWindow'
import { MonitorScreen, WallPhotos } from './Photos'

const WALL = '#6a7d9a'
const WHITE = '#f5f5f7'
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
  const keyW = 0.042
  const keyD = 0.04
  const keyH = 0.012
  const rows: Array<{ z: number; keys: string[]; offset: number }> = [
    { z: -0.065, offset: -0.255, keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'] },
    { z: -0.015, offset: -0.23, keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'] },
    { z: 0.035, offset: -0.205, keys: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'] },
  ]

  return (
    <group position={[-0.05, 0.785, 0.32]} rotation={[-0.06, 0, 0]}>
      <RoundedBox args={[0.68, 0.028, 0.26]} radius={0.01} position={[0, 0.016, 0]}>
        <meshStandardMaterial color="#f4f4f5" roughness={0.35} metalness={0.04} />
      </RoundedBox>
      {/* top edge line */}
      <mesh position={[0, 0.031, -0.118]}>
        <boxGeometry args={[0.64, 0.002, 0.004]} />
        <meshStandardMaterial color="#d4d4d8" roughness={0.4} />
      </mesh>

      {rows.map((row, ri) =>
        row.keys.map((label, i) => {
          const x = row.offset + i * 0.052
          return (
            <group key={`${ri}-${label}`} position={[x, 0.038, row.z]}>
              <RoundedBox args={[keyW, keyH, keyD]} radius={0.003}>
                <meshStandardMaterial color="#ffffff" roughness={0.28} metalness={0.05} />
              </RoundedBox>
              <mesh position={[0, keyH / 2 + 0.0005, 0]}>
                <boxGeometry args={[keyW * 0.85, 0.0008, keyD * 0.75]} />
                <meshStandardMaterial color="#e4e4e7" roughness={0.5} />
              </mesh>
              <Text
                position={[0, keyH / 2 + 0.0012, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.014}
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

      <group position={[0, 0.038, 0.085]}>
        <RoundedBox args={[0.24, keyH, 0.032]} radius={0.004}>
          <meshStandardMaterial color="#ffffff" roughness={0.28} />
        </RoundedBox>
        <Text
          position={[0, keyH / 2 + 0.0012, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.01}
          color="#52525b"
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
    <group position={[0.4, 0.785, 0.28]} rotation={[0, -0.22, 0]}>
      <mesh position={[0, 0.001, 0.008]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1.4, 1]}>
        <circleGeometry args={[0.048, 28]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      {/* Apple Magic Mouse–like low profile body */}
      <RoundedBox args={[0.062, 0.018, 0.112]} radius={0.01} position={[0, 0.014, 0]}>
        <meshStandardMaterial color="#f5f5f7" roughness={0.14} metalness={0.08} />
      </RoundedBox>
      {/* Gentle top dome */}
      <mesh position={[0, 0.022, 0]} scale={[1.05, 0.42, 1.15]}>
        <sphereGeometry args={[0.028, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#fafafa" roughness={0.12} metalness={0.06} />
      </mesh>

      {/* Multi-touch surface seam */}
      <mesh position={[0, 0.026, -0.008]}>
        <boxGeometry args={[0.0012, 0.0015, 0.048]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.0255, 0.022]}>
        <boxGeometry args={[0.042, 0.001, 0.0012]} />
        <meshStandardMaterial color="#e4e4e7" roughness={0.4} />
      </mesh>

      {/* Underside feet */}
      {([-0.018, 0.018] as const).map((x) =>
        ([-0.035, 0.035] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.004, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.006, 12]} />
            <meshStandardMaterial color="#d4d4d8" roughness={0.5} />
          </mesh>
        )),
      )}

      {/* Laser sensor */}
      <mesh position={[0, 0.004, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.007, 14]} />
        <meshStandardMaterial color="#18181b" roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.0045, 0.02]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.0025, 10]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.4} />
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

      {/* Monitor — shifted left */}
      <group position={[-0.45, 0.78, -0.32]}>
        <RoundedBox args={[1.38, 0.62, 0.026]} radius={0.01} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#1c1c1e" roughness={0.28} metalness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0.4, -0.002]}>
          <boxGeometry args={[1.4, 0.64, 0.01]} />
          <meshStandardMaterial color="#d1d5db" roughness={0.25} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.4, 0.015]}>
          <planeGeometry args={[1.3, 0.56]} />
          <meshBasicMaterial color="#a8c8ff" transparent opacity={0.2} />
        </mesh>
        <group position={[0, 0.4, 0.017]}>
          <MonitorScreen />
        </group>
        <mesh position={[0, 0.05, 0.01]}>
          <boxGeometry args={[0.05, 0.14, 0.035]} />
          <meshStandardMaterial color="#c5c9d0" metalness={0.65} roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.01, 0.05]} rotation={[0.05, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.17, 0.018, 32]} />
          <meshStandardMaterial color="#c5c9d0" metalness={0.65} roughness={0.22} />
        </mesh>
        <pointLight position={[0, 0.4, 0.35]} intensity={0.7} color="#e8f0ff" distance={3} decay={2} />
      </group>

      <WhiteKeyboard />
      <WhiteMouse />

      {/* MacBook — open, real chiclet keyboard */}
      <MacBook />

      {/* Phone lying flat on desk */}
      <IPhonePro position={[0.55, 0.792, 0.18]} />
    </group>
  )
}

function MacBook() {
  const keyRows: Array<{ z: number; keys: number; offset: number; keyW: number }> = [
    { z: -0.055, keys: 13, offset: -0.195, keyW: 0.028 },
    { z: -0.02, keys: 13, offset: -0.195, keyW: 0.028 },
    { z: 0.015, keys: 12, offset: -0.18, keyW: 0.028 },
    { z: 0.05, keys: 11, offset: -0.165, keyW: 0.028 },
  ]

  return (
    <group position={[1.0, 0.785, -0.05]} rotation={[0, -0.4, 0]}>
      {/* Base / palm rest */}
      <RoundedBox args={[0.52, 0.014, 0.34]} radius={0.01} position={[0, 0.008, 0]}>
        <meshStandardMaterial color="#c8ccd2" roughness={0.28} metalness={0.55} />
      </RoundedBox>

      {/* Keyboard deck */}
      <mesh position={[0, 0.0165, -0.01]}>
        <boxGeometry args={[0.46, 0.003, 0.2]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.55} />
      </mesh>

      {/* Chiclet keys */}
      {keyRows.map((row, ri) =>
        Array.from({ length: row.keys }).map((_, i) => {
          const x = row.offset + i * 0.032
          return (
            <RoundedBox
              key={`${ri}-${i}`}
              args={[row.keyW, 0.006, 0.026]}
              radius={0.002}
              position={[x, 0.021, row.z]}
            >
              <meshStandardMaterial color="#2a2a2e" roughness={0.45} metalness={0.15} />
            </RoundedBox>
          )
        }),
      )}

      {/* Space bar */}
      <RoundedBox args={[0.16, 0.006, 0.026]} radius={0.002} position={[0, 0.021, 0.085]}>
        <meshStandardMaterial color="#2a2a2e" roughness={0.45} metalness={0.15} />
      </RoundedBox>

      {/* Trackpad */}
      <RoundedBox args={[0.16, 0.002, 0.1]} radius={0.006} position={[0, 0.017, 0.125]}>
        <meshStandardMaterial color="#aeb2b8" roughness={0.35} metalness={0.25} />
      </RoundedBox>

      {/* Hinge */}
      <mesh position={[0, 0.014, -0.165]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.48, 12]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Lid + dark screen */}
      <group position={[0, 0.015, -0.16]} rotation={[-1.05, 0, 0]}>
        <RoundedBox args={[0.52, 0.33, 0.012]} radius={0.01} position={[0, 0.165, 0]}>
          <meshStandardMaterial color="#c8ccd2" roughness={0.28} metalness={0.55} />
        </RoundedBox>
        <mesh position={[0, 0.165, 0.008]}>
          <planeGeometry args={[0.46, 0.28]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.35} />
        </mesh>
        {/* Camera notch */}
        <mesh position={[0, 0.3, 0.009]}>
          <circleGeometry args={[0.006, 12]} />
          <meshStandardMaterial color="#111113" roughness={0.4} />
        </mesh>
      </group>
    </group>
  )
}

function GlassCoffeeTable() {
  return (
    <group position={[1.55, 0, -1.55]}>
      {/* Small rug in front of sofa */}
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1.25, 0.95]} />
        <meshStandardMaterial color="#6b7280" roughness={0.96} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0.06]} position={[0, 0.012, 0]}>
        <planeGeometry args={[1.12, 0.82]} />
        <meshStandardMaterial color="#8b929e" roughness={0.94} />
      </mesh>

      {/* Glass top */}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[0.88, 0.016, 0.48]} />
        <meshPhysicalMaterial
          color="#dceaf4"
          transparent
          opacity={0.22}
          roughness={0.04}
          metalness={0.02}
          transmission={0.9}
          thickness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.349, 0]}>
        <boxGeometry args={[0.89, 0.003, 0.49]} />
        <meshStandardMaterial color="#eef6fb" transparent opacity={0.4} roughness={0.08} metalness={0.25} />
      </mesh>

      {/* Four black square legs */}
      {(
        [
          [-0.36, 0.17, -0.18],
          [0.36, 0.17, -0.18],
          [-0.36, 0.17, 0.18],
          [0.36, 0.17, 0.18],
        ] as const
      ).map((pos, i) => (
        <mesh key={i} position={[...pos]}>
          <boxGeometry args={[0.028, 0.34, 0.028]} />
          <meshStandardMaterial color="#111113" roughness={0.45} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

function OfficeChair() {
  // Offset to the side so camera path to monitor stays clear
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

/** Intro copy — above shelf with clear gap */
function IntroWallText() {
  return (
    <group position={[-0.7, 2.62, -3.08]}>
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.1}
        color="#e8eef6"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
      >
        {COPY.heroLine1}
      </Text>
      <Text
        position={[-0.65, -0.08, 0]}
        fontSize={0.12}
        color="#f5f7fa"
        anchorX="left"
        anchorY="middle"
      >
        {COPY.heroLine2Before}
      </Text>
      <Text
        position={[-0.18, -0.08, 0]}
        fontSize={0.125}
        color="#e8c547"
        anchorX="left"
        anchorY="middle"
        fontStyle="italic"
      >
        {COPY.heroLine2Accent}
      </Text>
      <Text
        position={[0.35, -0.08, 0]}
        fontSize={0.12}
        color="#e8eef6"
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
  const books = [
    { x: -0.58, lean: 0, color: '#4b5563', height: 0.2, thickness: 0.036 },
    { x: -0.52, lean: 0, color: '#6b7280', height: 0.18, thickness: 0.034 },
    { x: -0.45, lean: -0.32, color: '#1e3a5f', height: 0.22, thickness: 0.04 },
    { x: -0.36, lean: 0, color: '#78716c', height: 0.17, thickness: 0.034 },
    { x: -0.3, lean: 0.02, color: '#57534e', height: 0.2, thickness: 0.036 },
    { x: -0.22, lean: 0.35, color: '#334155', height: 0.21, thickness: 0.038 },
    { x: -0.12, lean: 0, color: '#52525b', height: 0.18, thickness: 0.034 },
    { x: -0.06, lean: -0.03, color: '#3f3f46', height: 0.23, thickness: 0.04 },
  ]

  const ledColors = ['#ff5c8a', '#7c5cff', '#38bdf8', '#34d399', '#fbbf24', '#f472b6']

  return (
    <group position={[-0.55, 2.18, -3.02]}>
      <RoundedBox args={[1.55, 0.045, 0.22]} radius={0.01}>
        <meshStandardMaterial color={WHITE} roughness={0.4} />
      </RoundedBox>

      {books.map((book, i) => (
        <ShelfBook key={i} {...book} />
      ))}

      {/* Plant — taller stems, contained */}
      <group position={[0.5, 0.02, 0]}>
        <mesh position={[0, 0.035, 0]}>
          <cylinderGeometry args={[0.042, 0.036, 0.065, 16]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.068, 0]}>
          <cylinderGeometry args={[0.038, 0.038, 0.012, 16]} />
          <meshStandardMaterial color="#57534e" roughness={0.9} />
        </mesh>
        {(
          [
            [0.0, 0.08, 0.0, 0.14, 0.12, 0.05],
            [0.015, 0.08, 0.01, 0.12, -0.2, 0.12],
            [-0.015, 0.08, 0.008, 0.13, 0.25, -0.1],
            [0.01, 0.08, -0.012, 0.11, -0.15, -0.2],
          ] as const
        ).map(([sx, sy, sz, len, rx, rz], i) => (
          <group key={i} position={[sx, sy, sz]} rotation={[rx, 0, rz]}>
            <mesh position={[0, len / 2, 0]}>
              <cylinderGeometry args={[0.004, 0.006, len, 6]} />
              <meshStandardMaterial color="#4ade80" roughness={0.65} />
            </mesh>
            <mesh position={[0, len + 0.015, 0]} scale={[0.5, 1.0, 0.35]}>
              <sphereGeometry args={[0.032, 10, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#86efac' : '#4ade80'} roughness={0.55} />
            </mesh>
          </group>
        ))}
      </group>

      {/* RGB LED strip under shelf */}
      <mesh position={[0, -0.03, 0.02]}>
        <boxGeometry args={[1.35, 0.012, 0.02]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.4} />
      </mesh>
      {ledColors.map((color, i) => {
        const x = -0.55 + i * 0.22
        return (
          <group key={color} position={[x, -0.035, 0.02]}>
            <mesh>
              <boxGeometry args={[0.08, 0.008, 0.014]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <pointLight intensity={0.35} color={color} distance={0.7} decay={2} />
          </group>
        )
      })}

      {/* Wall outlet under shelf */}
      <group position={[0.35, -0.42, -0.04]}>
        <RoundedBox args={[0.12, 0.16, 0.03]} radius={0.008}>
          <meshStandardMaterial color="#e8e8ec" roughness={0.45} />
        </RoundedBox>
        <mesh position={[-0.025, 0.03, 0.016]}>
          <boxGeometry args={[0.035, 0.045, 0.01]} />
          <meshStandardMaterial color="#d4d4d8" roughness={0.5} />
        </mesh>
        <mesh position={[0.025, 0.03, 0.016]}>
          <boxGeometry args={[0.035, 0.045, 0.01]} />
          <meshStandardMaterial color="#d4d4d8" roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.04, 0.016]}>
          <circleGeometry args={[0.012, 16]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.5} roughness={0.35} />
        </mesh>
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
        color="#f3e6c8"
        roughness={0.55}
        metalness={0}
        envMapIntensity={0.45}
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

      {/* Right wall — opening matches smaller window (1.85 x 1.65 at y=1.95, z=0.35) */}
      <mesh position={[3.45, 3.837, 0]}>
        <boxGeometry args={[0.12, 2.125, 6.5]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[3.45, 0.562, 0]}>
        <boxGeometry args={[0.12, 1.125, 6.5]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[3.45, 1.95, -1.912]}>
        <boxGeometry args={[0.12, 1.66, 2.675]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[3.45, 1.95, 2.262]}>
        <boxGeometry args={[0.12, 1.66, 1.975]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>

      <mesh position={[-3.25, 2.45, 0]} rotation={[0, Math.PI / 2, 0]}>
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
      <OceanWindow />
      <GlassCoffeeTable />

      {/* Comfort sofa — gray, gap from back wall */}
      <group position={[1.65, 0.32, -2.35]}>
        <RoundedBox args={[1.85, 0.36, 0.85]} radius={0.06}>
          <meshStandardMaterial color="#9ca3af" roughness={0.92} />
        </RoundedBox>
        <RoundedBox args={[1.85, 0.55, 0.18]} radius={0.05} position={[0, 0.32, -0.32]}>
          <meshStandardMaterial color="#8b929e" roughness={0.92} />
        </RoundedBox>
        <RoundedBox args={[0.18, 0.28, 0.7]} radius={0.05} position={[-0.9, 0.22, 0.02]}>
          <meshStandardMaterial color="#9ca3af" roughness={0.92} />
        </RoundedBox>
        <RoundedBox args={[0.18, 0.28, 0.7]} radius={0.05} position={[0.9, 0.22, 0.02]}>
          <meshStandardMaterial color="#9ca3af" roughness={0.92} />
        </RoundedBox>
        <RoundedBox args={[0.42, 0.14, 0.28]} radius={0.04} position={[-0.35, 0.28, -0.12]}>
          <meshStandardMaterial color="#e5e7eb" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[0.42, 0.14, 0.28]} radius={0.04} position={[0.3, 0.28, -0.08]}>
          <meshStandardMaterial color="#e5e7eb" roughness={0.9} />
        </RoundedBox>
      </group>
    </group>
  )
}
