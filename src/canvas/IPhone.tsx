import { useTexture } from '@react-three/drei'
import { useMemo, useState } from 'react'
import {
  CanvasTexture,
  ExtrudeGeometry,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  type Texture,
} from 'three'
import { profile } from '../data/portfolio'

/** Real iOS 17 default wallpaper (from osxdaily.com) */
export const IOS_WALLPAPER_URL = '/textures/ios-17-wallpaper.jpg'

type AppId = 'gmail' | 'twitter' | 'linkedin'

/** Top → bottom: LinkedIn, Twitter, Gmail (Gmail last) */
const APPS: Array<{ id: AppId; url: string | null }> = [
  { id: 'linkedin', url: profile.linkedin },
  { id: 'twitter', url: profile.twitter },
  { id: 'gmail', url: `mailto:${profile.email}` },
]

/** iPhone 17 Pro proportions */
const BODY_W = 0.0715
const BODY_H = 0.1496
const BODY_T = 0.0083
const CORNER_R = 0.0118
/** Screen inset — stays inside rounded chassis (no corner overflow) */
const SCREEN_INSET = 0.00155
const SCREEN_W = BODY_W - SCREEN_INSET * 2
const SCREEN_H = BODY_H - SCREEN_INSET * 2
const SCREEN_R = CORNER_R - SCREEN_INSET
/** Large home-screen tiles like reference */
const ICON_SIZE = 0.029
const ICON_GAP = 0.0085
const ISLAND_Y = BODY_H * 0.385
const ISLAND_H = 0.0068

function roundedRectShape(w: number, h: number, r: number) {
  const shape = new Shape()
  const hw = w / 2
  const hh = h / 2
  const radius = Math.min(r, hw, hh)
  shape.moveTo(-hw + radius, -hh)
  shape.lineTo(hw - radius, -hh)
  shape.quadraticCurveTo(hw, -hh, hw, -hh + radius)
  shape.lineTo(hw, hh - radius)
  shape.quadraticCurveTo(hw, hh, hw - radius, hh)
  shape.lineTo(-hw + radius, hh)
  shape.quadraticCurveTo(-hw, hh, -hw, hh - radius)
  shape.lineTo(-hw, -hh + radius)
  shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh)
  return shape
}

function makeExtrudedBody(w: number, h: number, t: number, r: number) {
  const geo = new ExtrudeGeometry(roundedRectShape(w, h, r), {
    depth: t,
    bevelEnabled: false,
    curveSegments: 28,
  })
  geo.translate(0, 0, -t / 2)
  geo.computeVertexNormals()
  return geo
}

function makeScreenGeo(w: number, h: number, r: number) {
  const geo = new ShapeGeometry(roundedRectShape(w, h, r), 32)
  // Force 0–1 UVs so wallpaper maps correctly (ShapeGeometry defaults are unreliable)
  const pos = geo.attributes.position
  const uv = geo.attributes.uv
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h)
  }
  uv.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

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

/** Same official Gmail M as SocialSidebar (viewBox 52 42 88 66) */
function drawGmailIcon(ctx: CanvasRenderingContext2D, size: number) {
  roundRect(ctx, 0, 0, size, size, size * 0.223)
  ctx.fillStyle = '#2C2C2E'
  ctx.fill()

  const pad = size * 0.22
  const vbW = 88
  const vbH = 66
  const s = Math.min((size - pad * 2) / vbW, (size - pad * 2) / vbH)
  ctx.save()
  ctx.translate(size / 2 - (vbW * s) / 2 - 52 * s, size / 2 - (vbH * s) / 2 - 42 * s)
  ctx.scale(s, s)

  ctx.fillStyle = '#4285F4'
  ctx.fill(new Path2D('M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6'))
  ctx.fillStyle = '#34A853'
  ctx.fill(new Path2D('M120 108h14c3.32 0 6-2.69 6-6V59l-20 15'))
  ctx.fillStyle = '#FBBC05'
  ctx.fill(new Path2D('M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2'))
  ctx.fillStyle = '#EA4335'
  ctx.fill(new Path2D('M72 74V48l24 18 24-18v26L96 92'))
  ctx.fillStyle = '#C5221F'
  ctx.fill(new Path2D('M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2'))
  ctx.restore()
}

function drawTwitterIcon(ctx: CanvasRenderingContext2D, size: number) {
  roundRect(ctx, 0, 0, size, size, size * 0.223)
  ctx.fillStyle = '#1DA1F2'
  ctx.fill()

  ctx.fillStyle = '#FFFFFF'
  ctx.save()
  // Smaller bird = more padding inside the tile
  const scale = size * 0.038
  ctx.translate(size * 0.5 - 12 * scale, size * 0.5 - 12 * scale)
  ctx.scale(scale, scale)
  ctx.beginPath()
  ctx.moveTo(22.46, 6.01)
  ctx.bezierCurveTo(21.69, 6.35, 20.86, 6.58, 20, 6.69)
  ctx.bezierCurveTo(20.88, 6.16, 21.56, 5.32, 21.88, 4.31)
  ctx.bezierCurveTo(21.05, 4.81, 20.13, 5.16, 19.16, 5.36)
  ctx.bezierCurveTo(18.37, 4.5, 17.26, 4, 16.04, 4)
  ctx.bezierCurveTo(13.7, 4, 11.81, 5.89, 11.81, 8.23)
  ctx.bezierCurveTo(11.81, 8.56, 11.85, 8.89, 11.92, 9.2)
  ctx.bezierCurveTo(8.4, 9.02, 5.28, 7.34, 3.2, 4.78)
  ctx.bezierCurveTo(2.84, 5.4, 2.63, 6.16, 2.63, 6.94)
  ctx.bezierCurveTo(2.63, 8.43, 3.39, 9.74, 4.54, 10.5)
  ctx.bezierCurveTo(3.84, 10.48, 3.18, 10.29, 2.6, 9.97)
  ctx.bezierCurveTo(2.6, 9.99, 2.6, 10.01, 2.6, 10.03)
  ctx.bezierCurveTo(2.6, 12.08, 4.06, 13.79, 6, 14.18)
  ctx.bezierCurveTo(5.64, 14.28, 5.26, 14.33, 4.87, 14.33)
  ctx.bezierCurveTo(4.6, 14.33, 4.33, 14.3, 4.07, 14.25)
  ctx.bezierCurveTo(4.61, 15.94, 6.18, 17.17, 8.04, 17.2)
  ctx.bezierCurveTo(6.58, 18.35, 4.75, 19.03, 2.75, 19.03)
  ctx.bezierCurveTo(2.42, 19.03, 2.09, 19.01, 1.76, 18.97)
  ctx.bezierCurveTo(3.64, 20.18, 5.88, 20.88, 8.29, 20.88)
  ctx.bezierCurveTo(16.03, 20.88, 20.26, 14.46, 20.26, 8.9)
  ctx.bezierCurveTo(20.26, 8.72, 20.26, 8.54, 20.25, 8.36)
  ctx.bezierCurveTo(21.1, 7.75, 21.84, 6.98, 22.46, 6.01)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawLinkedInIcon(ctx: CanvasRenderingContext2D, size: number) {
  roundRect(ctx, 0, 0, size, size, size * 0.223)
  ctx.fillStyle = '#0A66C2'
  ctx.fill()

  ctx.fillStyle = '#FFFFFF'
  ctx.font = `800 ${size * 0.36}px Arial, Helvetica, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('in', size * 0.5, size * 0.54)
}

function makeAppIconTexture(id: AppId) {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  if (id === 'gmail') drawGmailIcon(ctx, size)
  else if (id === 'twitter') drawTwitterIcon(ctx, size)
  else drawLinkedInIcon(ctx, size)
  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

/** Full-bleed iOS 17 wallpaper + light status chrome */
function composePhoneHome(image: CanvasImageSource) {
  const w = 1290
  const h = 2796
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  const iw =
    'naturalWidth' in image
      ? (image as HTMLImageElement).naturalWidth || (image as HTMLImageElement).width
      : (image as HTMLCanvasElement).width || (image as ImageBitmap).width
  const ih =
    'naturalHeight' in image
      ? (image as HTMLImageElement).naturalHeight || (image as HTMLImageElement).height
      : (image as HTMLCanvasElement).height || (image as ImageBitmap).height

  // Stretch to exact phone aspect (source is already ~1290×2796)
  ctx.drawImage(image, 0, 0, Math.max(iw, 1), Math.max(ih, 1), 0, 0, w, h)

  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.font = '600 56px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('9:41', 100, 150)
  ctx.textAlign = 'right'
  ctx.font = '600 42px -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.fillText('■■■□  ▮', w - 90, 146)

  roundRect(ctx, w / 2 - 190, 52, 380, 96, 48)
  ctx.fillStyle = '#000000'
  ctx.fill()

  roundRect(ctx, w / 2 - 200, h - 58, 400, 16, 8)
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.fill()

  const tex = new CanvasTexture(canvas)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 8
  tex.flipY = true
  tex.needsUpdate = true
  return tex
}

/** Column starts below Dynamic Island */
function iconYPositions(): number[] {
  const step = ICON_SIZE + ICON_GAP
  const islandBottom = ISLAND_Y - ISLAND_H / 2
  const topIconCenter = islandBottom - 0.014 - ICON_SIZE / 2
  return [topIconCenter, topIconCenter - step, topIconCenter - 2 * step]
}

function AppIcon({
  url,
  position,
  map,
}: {
  url: string | null
  position: [number, number, number]
  map: Texture
}) {
  const [hovered, setHovered] = useState(false)
  const clickable = Boolean(url)

  return (
    <group
      position={position}
      scale={hovered && clickable ? 1.06 : 1}
      onPointerOver={(e) => {
        e.stopPropagation()
        if (!clickable) return
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (!url) return
        window.open(url, '_blank', 'noopener,noreferrer')
      }}
    >
      <mesh renderOrder={10}>
        <planeGeometry args={[ICON_SIZE, ICON_SIZE]} />
        <meshBasicMaterial map={map} toneMapped={false} transparent depthTest={false} />
      </mesh>
    </group>
  )
}

/** Flat titanium iPhone 17 Pro — rounded screen, large social tiles */
export function IPhonePro({ position }: { position: [number, number, number] }) {
  const baseWallpaper = useTexture(IOS_WALLPAPER_URL)
  const wallpaper = useMemo(
    () => composePhoneHome(baseWallpaper.image as CanvasImageSource),
    [baseWallpaper],
  )
  const icons = useMemo(
    () => ({
      gmail: makeAppIconTexture('gmail'),
      twitter: makeAppIconTexture('twitter'),
      linkedin: makeAppIconTexture('linkedin'),
    }),
    [],
  )
  const iconYs = useMemo(() => iconYPositions(), [])

  const bodyGeo = useMemo(() => makeExtrudedBody(BODY_W, BODY_H, BODY_T, CORNER_R), [])
  const bezelGeo = useMemo(
    () => makeExtrudedBody(SCREEN_W + 0.0006, SCREEN_H + 0.0006, 0.00085, SCREEN_R + 0.0003),
    [],
  )
  const screenGeo = useMemo(() => makeScreenGeo(SCREEN_W, SCREEN_H, SCREEN_R), [])

  const frontZ = BODY_T / 2

  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0.35]} scale={1.42}>
      {/* Flat titanium chassis */}
      <mesh geometry={bodyGeo}>
        <meshStandardMaterial color="#2c2c2e" metalness={0.9} roughness={0.26} />
      </mesh>

      {/* Thin black bezel — rounded, sits under glass */}
      <mesh geometry={bezelGeo} position={[0, 0, frontZ + 0.0001]}>
        <meshStandardMaterial color="#050505" metalness={0.3} roughness={0.42} />
      </mesh>

      {/* Rounded screen — Dynamic Island is drawn on the wallpaper only */}
      <mesh geometry={screenGeo} position={[0, 0, frontZ + 0.00055]}>
        <meshBasicMaterial map={wallpaper} toneMapped={false} />
      </mesh>

      {/* Action */}
      <mesh position={[-BODY_W / 2 - 0.0005, BODY_H * 0.18, 0]}>
        <boxGeometry args={[0.001, 0.012, 0.003]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.75} roughness={0.28} />
      </mesh>

      {/* Volume */}
      <mesh position={[-BODY_W / 2 - 0.0005, BODY_H * 0.06, 0]}>
        <boxGeometry args={[0.001, 0.022, 0.003]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[-BODY_W / 2 - 0.0005, BODY_H * -0.02, 0]}>
        <boxGeometry args={[0.001, 0.022, 0.003]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.75} roughness={0.28} />
      </mesh>

      {/* Power */}
      <mesh position={[BODY_W / 2 + 0.0005, BODY_H * 0.1, 0]}>
        <boxGeometry args={[0.001, 0.032, 0.003]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.75} roughness={0.28} />
      </mesh>

      <pointLight position={[0, 0, 0.08]} intensity={0.7} color="#e8f0ff" distance={0.55} decay={2} />

      <group position={[0, 0, frontZ + 0.0025]}>
        {APPS.map((app, i) => (
          <AppIcon key={app.id} url={app.url} position={[0, iconYs[i], 0]} map={icons[app.id]} />
        ))}
      </group>
    </group>
  )
}
