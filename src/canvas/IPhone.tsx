import { RoundedBox } from '@react-three/drei'
import { useMemo, useState } from 'react'
import { CanvasTexture, SRGBColorSpace } from 'three'
import { profile } from '../data/portfolio'

type AppId = 'linkedin' | 'twitter' | 'gmail'

const APPS: Array<{ id: AppId; url: string }> = [
  { id: 'linkedin', url: profile.linkedin },
  { id: 'twitter', url: profile.twitter },
  { id: 'gmail', url: `mailto:${profile.email}` },
]

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

/** LinkedIn — brand blue background */
function drawLinkedInIcon(ctx: CanvasRenderingContext2D, size: number) {
  roundRect(ctx, 0, 0, size, size, size * 0.22)
  ctx.fillStyle = '#0A66C2'
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 ${size * 0.42}px -apple-system, Arial, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('in', size / 2, size / 2 + size * 0.04)
}

/** Twitter — brand sky-blue background + bird */
function drawTwitterIcon(ctx: CanvasRenderingContext2D, size: number) {
  roundRect(ctx, 0, 0, size, size, size * 0.22)
  ctx.fillStyle = '#1DA1F2'
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.save()
  ctx.translate(size * 0.5, size * 0.52)
  ctx.scale(size / 400, size / 400)
  ctx.beginPath()
  ctx.moveTo(40, -20)
  ctx.bezierCurveTo(55, -35, 75, -40, 95, -38)
  ctx.bezierCurveTo(90, -25, 82, -15, 70, -8)
  ctx.bezierCurveTo(85, -8, 98, -15, 105, -28)
  ctx.bezierCurveTo(105, 10, 80, 35, 40, 40)
  ctx.bezierCurveTo(20, 40, 0, 32, -15, 20)
  ctx.bezierCurveTo(-5, 22, 5, 20, 12, 15)
  ctx.bezierCurveTo(-5, 15, -22, 0, -25, -18)
  ctx.bezierCurveTo(-18, -14, -8, -12, 2, -14)
  ctx.bezierCurveTo(-15, -30, -8, -48, 12, -52)
  ctx.bezierCurveTo(22, -40, 32, -28, 40, -20)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

/** Gmail — white brand background + colorful M */
function drawGmailIcon(ctx: CanvasRenderingContext2D, size: number) {
  roundRect(ctx, 0, 0, size, size, size * 0.22)
  ctx.fillStyle = '#FFFFFF'
  ctx.fill()
  // Soft brand tint edge
  ctx.strokeStyle = 'rgba(234,67,53,0.15)'
  ctx.lineWidth = size * 0.03
  roundRect(ctx, size * 0.04, size * 0.04, size * 0.92, size * 0.92, size * 0.18)
  ctx.stroke()

  const s = size
  const m = s * 0.18
  const mid = s / 2
  const top = m * 1.15
  const bot = s - m
  const peak = s * 0.52

  ctx.beginPath()
  ctx.moveTo(m, top)
  ctx.lineTo(mid, peak)
  ctx.lineTo(mid, peak + s * 0.08)
  ctx.lineTo(m + s * 0.14, top + s * 0.12)
  ctx.closePath()
  ctx.fillStyle = '#EA4335'
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(s - m, top)
  ctx.lineTo(mid, peak)
  ctx.lineTo(mid, peak + s * 0.08)
  ctx.lineTo(s - m - s * 0.14, top + s * 0.12)
  ctx.closePath()
  ctx.fillStyle = '#4285F4'
  ctx.fill()

  ctx.fillStyle = '#34A853'
  ctx.fillRect(m, top + s * 0.08, s * 0.14, bot - top - s * 0.08)
  ctx.fillStyle = '#FBBC05'
  ctx.fillRect(s - m - s * 0.14, top + s * 0.08, s * 0.14, bot - top - s * 0.08)
  ctx.fillStyle = '#E8EAED'
  ctx.fillRect(m + s * 0.14, peak + s * 0.02, s - 2 * m - s * 0.28, bot - peak - s * 0.02)
}

function makeAppIconTexture(id: AppId) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  if (id === 'linkedin') drawLinkedInIcon(ctx, size)
  else if (id === 'twitter') drawTwitterIcon(ctx, size)
  else drawGmailIcon(ctx, size)
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Fresh wallpaper — soft green / teal abstract (not previous blue ribbons) */
function getPhoneHomeTexture() {
  const w = 390
  const h = 844
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const bg = ctx.createLinearGradient(0, 0, w, h)
  bg.addColorStop(0, '#d8f0e8')
  bg.addColorStop(0.3, '#9ed4c8')
  bg.addColorStop(0.55, '#6bb8c4')
  bg.addColorStop(0.8, '#4a8eb0')
  bg.addColorStop(1, '#3a6a98')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  for (let i = 0; i < 6; i++) {
    const x = 40 + (i % 3) * 140
    const y = 120 + Math.floor(i / 3) * 320
    const g = ctx.createRadialGradient(x, y, 10, x, y, 160)
    g.addColorStop(0, i % 2 === 0 ? 'rgba(255,255,255,0.35)' : 'rgba(80,160,180,0.35)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
  }

  ctx.fillStyle = 'rgba(255,255,255,0.12)'
  ctx.beginPath()
  ctx.ellipse(w * 0.7, h * 0.35, 120, 200, 0.4, 0, Math.PI * 2)
  ctx.fill()

  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

function AppIcon({
  url,
  position,
  map,
}: {
  url: string
  position: [number, number, number]
  map: CanvasTexture
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={position}
      scale={hovered ? 1.08 : 1}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        window.open(url, '_blank', 'noopener,noreferrer')
      }}
    >
      <mesh>
        <planeGeometry args={[0.034, 0.034]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  )
}

/** Black phone — screen inset inside bezel so it never sticks out */
export function IPhonePro({ position }: { position: [number, number, number] }) {
  const wallpaper = useMemo(() => getPhoneHomeTexture(), [])
  const icons = useMemo(
    () => ({
      linkedin: makeAppIconTexture('linkedin'),
      twitter: makeAppIconTexture('twitter'),
      gmail: makeAppIconTexture('gmail'),
    }),
    [],
  )

  const gap = 0.048

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0.55]} scale={1.1}>
      <mesh position={[0.01, -0.01, -0.007]} rotation={[0, 0, 0.05]}>
        <planeGeometry args={[0.1, 0.2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      {/* Black chassis */}
      <RoundedBox args={[0.084, 0.172, 0.01]} radius={0.014}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.55} roughness={0.35} />
      </RoundedBox>

      {/* Inner black bezel — keeps screen inside the frame */}
      <RoundedBox args={[0.078, 0.164, 0.002]} radius={0.012} position={[0, 0, 0.0045]}>
        <meshStandardMaterial color="#050505" roughness={0.4} />
      </RoundedBox>

      {/* Screen inset smaller than bezel */}
      <mesh position={[0, 0, 0.0058]}>
        <planeGeometry args={[0.07, 0.152]} />
        <meshBasicMaterial map={wallpaper} toneMapped={false} />
      </mesh>

      {/* Dynamic Island */}
      <RoundedBox args={[0.028, 0.0075, 0.0016]} radius={0.0032} position={[0, 0.06, 0.0068]}>
        <meshStandardMaterial color="#000000" roughness={0.35} />
      </RoundedBox>

      <mesh position={[-0.0435, 0.02, 0]}>
        <boxGeometry args={[0.002, 0.022, 0.004]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0.0435, 0.01, 0]}>
        <boxGeometry args={[0.002, 0.028, 0.004]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.35} />
      </mesh>

      <pointLight position={[0, 0, 0.09]} intensity={0.85} color="#eef4ff" distance={0.6} decay={2} />

      <group position={[0, 0.002, 0.0062]}>
        {APPS.map((app, i) => (
          <AppIcon
            key={app.id}
            url={app.url}
            position={[0, 0.042 - i * gap, 0]}
            map={icons[app.id]}
          />
        ))}
      </group>
    </group>
  )
}
