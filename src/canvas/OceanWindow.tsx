import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { CanvasTexture, DoubleSide, Group, ShaderMaterial, SRGBColorSpace } from 'three'
import { COPY } from '../data/portfolio'

const FRAME = '#f7f7f8'
/** Slightly smaller window */
const WIN_W = 1.85
const WIN_H = 1.65
const WIN_Y = 1.95
const WIN_Z = 0.35

const waveVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const waveFrag = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float water = smoothstep(0.56, 0.46, uv.y);
    float t = uTime * 0.7;

    // Sloped / diagonal wave motion
    float slope = uv.x * 1.8 + uv.y * 3.2;
    float w1 = sin(slope * 8.0 + t * 1.5);
    float w2 = sin(uv.x * 18.0 - uv.y * 28.0 + t * 1.2) * 0.65;
    float w3 = cos(uv.x * 9.0 + uv.y * 22.0 + t * 0.9) * 0.45;

    uv.x += (w1 * 0.55 + w2) * 0.014 * water;
    uv.y += (w1 * 0.35 + w3) * 0.011 * water;
    uv = clamp(uv, 0.002, 0.998);

    vec4 col = texture2D(uMap, uv);

    // Rolling shade on slopes — sea blue depth, no white streaks
    float roll = sin(slope * 6.0 + t * 1.3) * 0.5 + 0.5;
    col.rgb *= mix(0.88, 1.05, mix(1.0, roll, water));
    col.rgb = mix(col.rgb, col.rgb * vec3(0.75, 0.9, 1.05), water * 0.12);

    gl_FragColor = col;
  }
`

/** Painted sea + sky — deep sea blue with soft distance fade */
function buildSeaPlate() {
  const w = 1536
  const h = 1024
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5)
  sky.addColorStop(0, '#4a90c4')
  sky.addColorStop(0.5, '#7eb6dc')
  sky.addColorStop(1, '#b8d4ea')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h * 0.52)

  for (let i = 0; i < 6; i++) {
    const cx = (i * 210 + 100) % w
    const cy = 55 + (i % 3) * 40
    const g = ctx.createRadialGradient(cx, cy, 6, cx, cy, 75)
    g.addColorStop(0, 'rgba(255,255,255,0.35)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(cx - 90, cy - 45, 180, 90)
  }

  const sun = ctx.createRadialGradient(w * 0.72, h * 0.16, 4, w * 0.72, h * 0.16, 120)
  sun.addColorStop(0, 'rgba(255,246,210,0.65)')
  sun.addColorStop(0.4, 'rgba(255,230,170,0.18)')
  sun.addColorStop(1, 'rgba(255,220,140,0)')
  ctx.fillStyle = sun
  ctx.fillRect(0, 0, w, h * 0.45)

  // Deep sea blue (ocean, not pale)
  const sea = ctx.createLinearGradient(0, h * 0.48, 0, h)
  sea.addColorStop(0, '#3d9fc4')
  sea.addColorStop(0.18, '#1a7aab')
  sea.addColorStop(0.4, '#0d5f90')
  sea.addColorStop(0.7, '#084a75')
  sea.addColorStop(1, '#063a5e')
  ctx.fillStyle = sea
  ctx.fillRect(0, h * 0.48, w, h * 0.52)

  // Soft sloped shade bands (blue-on-blue, not white lines)
  for (let i = 0; i < 18; i++) {
    const y0 = h * 0.52 + i * 22
    ctx.beginPath()
    ctx.moveTo(0, y0)
    for (let x = 0; x <= w; x += 20) {
      const y = y0 + Math.sin(x * 0.012 + i) * 4 + (x / w) * 18
      ctx.lineTo(x, y)
    }
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.closePath()
    ctx.fillStyle = i % 2 === 0 ? 'rgba(8,55,90,0.12)' : 'rgba(40,130,175,0.1)'
    ctx.fill()
  }

  // Distance fade into horizon
  const fade = ctx.createLinearGradient(0, h * 0.46, 0, h * 0.62)
  fade.addColorStop(0, 'rgba(150,190,215,0)')
  fade.addColorStop(0.4, 'rgba(120,170,200,0.4)')
  fade.addColorStop(1, 'rgba(60,120,160,0)')
  ctx.fillStyle = fade
  ctx.fillRect(0, h * 0.44, w, h * 0.2)

  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function getRayTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, size, 0)
  g.addColorStop(0, 'rgba(255,230,180,0)')
  g.addColorStop(0.35, 'rgba(255,220,160,0.55)')
  g.addColorStop(0.55, 'rgba(255,235,190,0.7)')
  g.addColorStop(0.75, 'rgba(255,220,160,0.4)')
  g.addColorStop(1, 'rgba(255,230,180,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const fade = ctx.createLinearGradient(0, 0, 0, size)
  fade.addColorStop(0, 'rgba(255,255,255,0.15)')
  fade.addColorStop(0.4, 'rgba(255,255,255,1)')
  fade.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.globalCompositeOperation = 'destination-in'
  ctx.fillStyle = fade
  ctx.fillRect(0, 0, size, size)
  const tex = new CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

/** Brown sailboat — mast, boom, sails, ropes; fades in/out at distance */
function DistantShip({ start, speed, y, scale }: { start: number; speed: number; y: number; scale: number }) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + start
    const p = (t % 55) / 55
    const z = -1.55 + p * 3.9
    ref.current.position.set(4.68, y + Math.sin(t * 0.5) * 0.01, z)
    // Soft fade at both ends — fully gone far away
    const fade = Math.min(p / 0.12, (1 - p) / 0.18, 1)
    ref.current.traverse((obj) => {
      const mesh = obj as { material?: { transparent?: boolean; opacity?: number; depthWrite?: boolean } | Array<{ transparent?: boolean; opacity?: number; depthWrite?: boolean }> }
      if (!mesh.material) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      for (const m of mats) {
        m.transparent = true
        m.opacity = fade
        m.depthWrite = fade > 0.2
      }
    })
  })

  const rope = '#2a1810'
  const wood = '#3d2412'
  const hull = '#6b3e22'
  const sail = '#f2ebe0'

  return (
    <group ref={ref} scale={scale} rotation={[0, Math.PI / 2, 0]}>
      {/* Hull */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.42, 0.06, 0.12]} />
        <meshStandardMaterial color={hull} roughness={0.65} />
      </mesh>
      <mesh position={[0.16, 0.02, 0]} rotation={[0, 0, -0.28]}>
        <boxGeometry args={[0.12, 0.045, 0.1]} />
        <meshStandardMaterial color="#5a3218" roughness={0.65} />
      </mesh>
      <mesh position={[-0.16, 0.025, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.1, 0.04, 0.1]} />
        <meshStandardMaterial color="#5a3218" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.062, 0]}>
        <boxGeometry args={[0.38, 0.012, 0.1]} />
        <meshStandardMaterial color="#7a4a28" roughness={0.55} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.08, 0.1, 0]}>
        <boxGeometry args={[0.12, 0.07, 0.09]} />
        <meshStandardMaterial color="#4a2e16" roughness={0.55} />
      </mesh>
      <mesh position={[-0.08, 0.115, 0.04]}>
        <boxGeometry args={[0.08, 0.03, 0.012]} />
        <meshStandardMaterial color="#87b8d0" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Mast */}
      <mesh position={[0.02, 0.22, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.32, 8]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Boom */}
      <mesh position={[0.1, 0.09, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 0.22, 6]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Yard / cross spar */}
      <mesh position={[0.02, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.004, 0.004, 0.14, 6]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Bowsprit */}
      <mesh position={[-0.24, 0.06, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.004, 0.005, 0.14, 6]} />
        <meshStandardMaterial color={wood} roughness={0.5} />
      </mesh>
      {/* Sails */}
      <mesh position={[0.1, 0.2, 0.002]} rotation={[0, 0, -0.15]}>
        <planeGeometry args={[0.2, 0.26]} />
        <meshStandardMaterial color={sail} roughness={0.9} side={DoubleSide} />
      </mesh>
      <mesh position={[0.06, 0.32, -0.002]} rotation={[0, 0, -0.08]}>
        <planeGeometry args={[0.12, 0.1]} />
        <meshStandardMaterial color="#ebe3d6" roughness={0.9} side={DoubleSide} />
      </mesh>
      <mesh position={[-0.12, 0.16, 0.001]} rotation={[0, 0, 0.4]}>
        <planeGeometry args={[0.12, 0.18]} />
        <meshStandardMaterial color="#f5f0e6" roughness={0.9} side={DoubleSide} />
      </mesh>
      {/* Rigging ropes */}
      <mesh position={[0.08, 0.18, 0.03]} rotation={[0.35, 0, -0.55]}>
        <cylinderGeometry args={[0.0015, 0.0015, 0.28, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.18, -0.03]} rotation={[-0.35, 0, -0.55]}>
        <cylinderGeometry args={[0.0015, 0.0015, 0.28, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.2, 0.02]} rotation={[0.25, 0, 0.55]}>
        <cylinderGeometry args={[0.0014, 0.0014, 0.26, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.2, -0.02]} rotation={[-0.25, 0, 0.55]}>
        <cylinderGeometry args={[0.0014, 0.0014, 0.26, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
      <mesh position={[-0.12, 0.14, 0]} rotation={[0, 0, 0.85]}>
        <cylinderGeometry args={[0.0013, 0.0013, 0.22, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
      <mesh position={[0.02, 0.28, 0.04]} rotation={[0.6, 0, 0]}>
        <cylinderGeometry args={[0.0012, 0.0012, 0.12, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
      <mesh position={[0.02, 0.28, -0.04]} rotation={[-0.6, 0, 0]}>
        <cylinderGeometry args={[0.0012, 0.0012, 0.12, 4]} />
        <meshStandardMaterial color={rope} roughness={0.8} />
      </mesh>
    </group>
  )
}

/** Single black bird silhouette — distant */
function BlackBird({ offset }: { offset: [number, number, number] }) {
  const wingL = useRef<Group>(null)
  const wingR = useRef<Group>(null)

  useFrame(({ clock }) => {
    const flap = Math.sin(clock.elapsedTime * 7 + offset[0] * 20) * 0.4
    if (wingL.current) wingL.current.rotation.z = 0.2 + flap
    if (wingR.current) wingR.current.rotation.z = -0.2 - flap
  })

  return (
    <group position={offset} scale={0.55}>
      <mesh>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
      <group ref={wingL} position={[-0.004, 0.002, 0]}>
        <mesh position={[-0.035, 0, 0]} rotation={[0.1, 0, 0.05]}>
          <boxGeometry args={[0.07, 0.003, 0.014]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </group>
      <group ref={wingR} position={[0.004, 0.002, 0]}>
        <mesh position={[0.035, 0, 0]} rotation={[0.1, 0, -0.05]}>
          <boxGeometry args={[0.07, 0.003, 0.014]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </group>
    </group>
  )
}

/** Flock of 3 birds moving together */
function BirdFlock({ start, speed, y, x }: { start: number; speed: number; y: number; x: number }) {
  const ref = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + start
    const z = -1.5 + ((t % 36) / 36) * 3.8
    ref.current.position.set(x + Math.sin(t * 0.35) * 0.08, y + Math.sin(t * 0.9) * 0.05, z)
  })

  return (
    <group ref={ref}>
      <BlackBird offset={[0, 0, 0]} />
      <BlackBird offset={[-0.07, 0.03, 0.04]} />
      <BlackBird offset={[0.06, -0.02, -0.05]} />
    </group>
  )
}

function SoftRay({
  map,
  position,
  rotation,
  scale,
  opacity,
}: {
  map: CanvasTexture
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  opacity: number
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={DoubleSide}
        toneMapped={false}
      />
    </mesh>
  )
}

function AnimatedSea() {
  const map = useMemo(() => buildSeaPlate(), [])
  const matRef = useRef<ShaderMaterial>(null)
  const uniforms = useMemo(() => ({ uMap: { value: map }, uTime: { value: 0 } }), [map])

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh position={[4.85, WIN_Y - 0.05, WIN_Z]} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[5.5, 3.6]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={waveVert}
        fragmentShader={waveFrag}
        toneMapped={false}
      />
    </mesh>
  )
}

function WindowAboutText() {
  const lines = [COPY.windowAbout1, COPY.windowAbout2, COPY.windowAbout3]
  return (
    <group position={[3.32, 3.22, WIN_Z]} rotation={[0, -Math.PI / 2, 0]}>
      {lines.map((line, i) => (
        <Text
          key={line}
          position={[0, -i * 0.12, 0]}
          fontSize={0.075}
          color="#f0f4f8"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.6}
          textAlign="center"
          letterSpacing={0.01}
          lineHeight={1.25}
        >
          {line}
        </Text>
      ))}
    </group>
  )
}

/** Stylized moving sea + distant brown ships + black bird flocks + about copy */
export function OceanWindow() {
  const rayMap = useMemo(() => getRayTexture(), [])
  const halfW = WIN_W / 2
  const halfH = WIN_H / 2
  const trim = 0.08

  return (
    <group>
      <AnimatedSea />
      <WindowAboutText />

      <mesh position={[3.36, WIN_Y, WIN_Z]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[WIN_W, WIN_H]} />
        <meshPhysicalMaterial
          color="#f5f9ff"
          transparent
          opacity={0.05}
          roughness={0.02}
          metalness={0}
          transmission={0.92}
          thickness={0.08}
        />
      </mesh>

      <group position={[3.38, WIN_Y, WIN_Z]}>
        <mesh position={[0, halfH + trim / 2, 0]}>
          <boxGeometry args={[0.09, trim, WIN_W + trim * 2]} />
          <meshStandardMaterial color={FRAME} roughness={0.32} />
        </mesh>
        <mesh position={[0, -(halfH + trim / 2), 0]}>
          <boxGeometry args={[0.09, trim, WIN_W + trim * 2]} />
          <meshStandardMaterial color={FRAME} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0, -(halfW + trim / 2)]}>
          <boxGeometry args={[0.09, WIN_H + trim * 2, trim]} />
          <meshStandardMaterial color={FRAME} roughness={0.32} />
        </mesh>
        <mesh position={[0, 0, halfW + trim / 2]}>
          <boxGeometry args={[0.09, WIN_H + trim * 2, trim]} />
          <meshStandardMaterial color={FRAME} roughness={0.32} />
        </mesh>
        <mesh position={[-0.02, halfH - 0.015, 0]}>
          <boxGeometry args={[0.035, 0.03, WIN_W - 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.28} />
        </mesh>
        <mesh position={[-0.02, -(halfH - 0.015), 0]}>
          <boxGeometry args={[0.035, 0.03, WIN_W - 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.28} />
        </mesh>
        <mesh position={[-0.02, 0, -(halfW - 0.015)]}>
          <boxGeometry args={[0.035, WIN_H - 0.03, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.28} />
        </mesh>
        <mesh position={[-0.02, 0, halfW - 0.015]}>
          <boxGeometry args={[0.035, WIN_H - 0.03, 0.03]} />
          <meshStandardMaterial color="#ffffff" roughness={0.28} />
        </mesh>
        <mesh position={[-0.05, -(halfH + 0.035), 0]}>
          <boxGeometry args={[0.12, 0.035, WIN_W + 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      <SoftRay map={rayMap} position={[2.4, 1.5, 0.4]} rotation={[0.12, 0.05, -0.62]} scale={[3.0, 1.6, 1]} opacity={0.36} />
      <SoftRay map={rayMap} position={[1.7, 1.15, 0.05]} rotation={[0.18, 0.08, -0.55]} scale={[2.6, 1.35, 1]} opacity={0.26} />
      <SoftRay map={rayMap} position={[1.0, 0.92, -0.7]} rotation={[0.22, 0.1, -0.48]} scale={[2.2, 1.1, 1]} opacity={0.18} />
      <SoftRay map={rayMap} position={[0.35, 0.84, -1.55]} rotation={[0.26, 0.06, -0.4]} scale={[1.85, 0.95, 1]} opacity={0.12} />

      <mesh position={[-0.2, 0.786, -2.35]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <planeGeometry args={[1.7, 1.0]} />
        <meshBasicMaterial color="#ffd9a0" transparent opacity={0.26} depthWrite={false} />
      </mesh>
      <mesh position={[0.55, 0.02, -1.6]} rotation={[-Math.PI / 2, 0, 0.25]}>
        <planeGeometry args={[2.2, 1.5]} />
        <meshBasicMaterial color="#ffe2b0" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      <directionalLight position={[8, 4.2, 2.0]} intensity={1.45} color="#ffe8cc" />
      <spotLight position={[3.25, 2.55, 0.5]} angle={0.82} penumbra={1} intensity={3.4} color="#ffe0b8" distance={14} decay={1.2} />
      <spotLight position={[2.3, 2.1, -0.5]} angle={0.7} penumbra={1} intensity={2.2} color="#ffe6c4" distance={10} decay={1.3} />
      <pointLight position={[2.0, 1.3, -1.3]} intensity={1.2} color="#ffe8cc" distance={7} decay={1.75} />
      <pointLight position={[0.15, 1.0, -2.25]} intensity={0.95} color="#fff2e0" distance={5} decay={1.9} />
      {/* Soft desk fill for phone */}
      <pointLight position={[-0.05, 1.05, -2.15]} intensity={0.7} color="#fff8f0" distance={2.5} decay={2} />

      <DistantShip start={0} speed={0.055} y={1.4} scale={0.95} />
      <DistantShip start={22} speed={0.045} y={1.36} scale={0.7} />
      <DistantShip start={38} speed={0.05} y={1.38} scale={0.55} />

      <BirdFlock start={0} speed={0.12} y={2.55} x={4.45} />
      <BirdFlock start={12} speed={0.1} y={2.75} x={4.55} />
      <BirdFlock start={24} speed={0.135} y={2.45} x={4.4} />
    </group>
  )
}
