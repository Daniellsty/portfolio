import { CanvasTexture, SRGBColorSpace } from 'three'

export const SKILLS = [
  'HTML',
  'CSS',
  'SCSS',
  'Tailwind',
  'React',
  'Next',
  'GSAP',
  'Three.js',
  'JavaScript',
  'TypeScript',
  'Node',
  'Express',
  'MongoDB',
] as const

export const NATURE_WALLPAPER_URL = '/textures/nature-wallpaper.jpg'

const DOCK_APPS = [
  { name: 'Messages', short: 'Msg', color: '#34c759', open: true },
  { name: 'WhatsApp', short: 'WA', color: '#25d366', open: true },
  { name: 'Calendar', short: 'Cal', color: '#ff3b30', open: true },
  { name: 'Spotify', short: 'Spot', color: '#1db954', open: true },
  { name: 'VS Code', short: 'Code', color: '#0078d4', open: true },
  { name: 'Finder', short: 'Find', color: '#5ac8fa', open: true },
  { name: 'Safari', short: 'Saf', color: '#0a84ff', open: false },
] as const

let skillsTexture: CanvasTexture | null = null
let builtWithPhoto = false

/** Ultrawide macOS desktop — real nature wallpaper + Skills Finder */
export function getSkillsTexture(wallpaper?: CanvasImageSource | null) {
  if (skillsTexture && builtWithPhoto) return skillsTexture
  if (skillsTexture && !wallpaper) return skillsTexture

  const w = 1920
  const h = 860
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!

  drawWallpaper(ctx, w, h, wallpaper)
  drawMenuBar(ctx, w)
  drawFinderWindow(ctx, w, h)
  drawDock(ctx, w, h)

  if (skillsTexture) {
    skillsTexture.dispose()
  }
  skillsTexture = new CanvasTexture(canvas)
  skillsTexture.colorSpace = SRGBColorSpace
  skillsTexture.needsUpdate = true
  builtWithPhoto = Boolean(wallpaper)
  return skillsTexture
}

function drawWallpaper(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  wallpaper?: CanvasImageSource | null,
) {
  if (wallpaper) {
    const { iw, ih } = imageSize(wallpaper)
    const scale = Math.max(w / iw, h / ih)
    const dw = iw * scale
    const dh = ih * scale
    ctx.drawImage(wallpaper, (w - dw) / 2, (h - dh) / 2, dw, dh)
    ctx.fillStyle = 'rgba(0,0,0,0.12)'
    ctx.fillRect(0, 0, w, h)
    return
  }

  const sky = ctx.createLinearGradient(0, 0, 0, h)
  sky.addColorStop(0, '#6fa8ff')
  sky.addColorStop(0.55, '#c8dde8')
  sky.addColorStop(1, '#8a9a6e')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)
}

function imageSize(src: CanvasImageSource) {
  if (src instanceof HTMLImageElement) {
    return { iw: src.naturalWidth || src.width, ih: src.naturalHeight || src.height }
  }
  if (src instanceof HTMLCanvasElement || src instanceof ImageBitmap) {
    return { iw: src.width, ih: src.height }
  }
  if (typeof OffscreenCanvas !== 'undefined' && src instanceof OffscreenCanvas) {
    return { iw: src.width, ih: src.height }
  }
  return { iw: 1920, ih: 1080 }
}

function drawMenuBar(ctx: CanvasRenderingContext2D, w: number) {
  ctx.fillStyle = 'rgba(28,28,30,0.35)'
  ctx.fillRect(0, 0, w, 28)

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.fillText('', 14, 19)
  ctx.font = '600 12px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.fillText('Finder', 38, 19)

  ctx.font = '400 12px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ;['File', 'Edit', 'View', 'Go', 'Window', 'Help'].forEach((item, i) => {
    ctx.fillText(item, 95 + i * 56, 19)
  })

  ctx.textAlign = 'right'
  ctx.fillText('Sun 12:11', w - 16, 19)
  ctx.textAlign = 'left'
}

function drawFinderWindow(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const wx = 90
  const wy = 48
  const ww = w - 180
  const wh = h - 140

  ctx.fillStyle = 'rgba(0,0,0,0.22)'
  roundRect(ctx, wx + 8, wy + 12, ww, wh, 14)
  ctx.fill()

  ctx.fillStyle = 'rgba(246,246,248,0.94)'
  roundRect(ctx, wx, wy, ww, wh, 14)
  ctx.fill()

  ;['#ff5f57', '#febc2e', '#28c840'].forEach((color, i) => {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(wx + 24 + i * 22, wy + 18, 6.5, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.fillStyle = '#1d1d1f'
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Skills', wx + ww / 2, wy + 22)
  ctx.textAlign = 'left'

  ctx.fillStyle = 'rgba(228,228,232,0.95)'
  ctx.fillRect(wx, wy + 36, ww, 36)
  drawPathBar(ctx, wx + 16, wy + 44, ww - 32)

  const sideW = 180
  ctx.fillStyle = 'rgba(242,242,244,0.98)'
  ctx.fillRect(wx, wy + 72, sideW, wh - 72)

  const sideItems = [
    { label: 'Favorites', header: true },
    { label: 'My Computer', active: false },
    { label: 'Desktop', active: false },
    { label: 'Documents', active: false },
    { label: 'Skills', active: true },
    { label: 'Locations', header: true },
    { label: 'Macintosh HD', active: false },
  ]

  let sy = wy + 92
  sideItems.forEach((item) => {
    if (item.header) {
      ctx.fillStyle = '#8e8e93'
      ctx.font = '600 10px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
      ctx.fillText(item.label.toUpperCase(), wx + 18, sy)
      sy += 24
      return
    }
    if (item.active) {
      ctx.fillStyle = '#0a84ff'
      roundRect(ctx, wx + 10, sy - 14, sideW - 20, 26, 7)
      ctx.fill()
      ctx.fillStyle = '#ffffff'
    } else {
      ctx.fillStyle = '#1d1d1f'
    }
    ctx.font = '500 13px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
    ctx.fillText(item.label, wx + 22, sy)
    sy += 30
  })

  const cx = wx + sideW
  const cy = wy + 72
  const cw = ww - sideW
  ctx.fillStyle = 'rgba(255,255,255,0.92)'
  ctx.fillRect(cx, cy, cw, wh - 72)

  ctx.fillStyle = '#8e8e93'
  ctx.font = '400 12px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.fillText(`${SKILLS.length} items — Skills directory`, cx + 24, cy + 24)

  const cols = 7
  const cellW = Math.floor((cw - 40) / cols)
  const cellH = 115
  const startX = cx + 28
  const startY = cy + 44

  SKILLS.forEach((skill, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    drawFolderIcon(ctx, startX + col * cellW, startY + row * cellH, skill)
  })
}

function drawPathBar(ctx: CanvasRenderingContext2D, x: number, y: number, maxW: number) {
  const barW = Math.min(maxW, 460)
  ctx.fillStyle = '#ffffff'
  roundRect(ctx, x, y, barW, 22, 6)
  ctx.fill()
  ctx.strokeStyle = 'rgba(0,0,0,0.08)'
  ctx.lineWidth = 1
  roundRect(ctx, x, y, barW, 22, 6)
  ctx.stroke()

  const parts = ['My Computer', 'Skills']
  let px = x + 10
  ctx.font = '500 11px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'

  parts.forEach((part, i) => {
    ctx.fillStyle = i === parts.length - 1 ? '#0a84ff' : '#5ac8fa'
    roundRect(ctx, px, y + 5, 12, 10, 2)
    ctx.fill()
    ctx.fillStyle = '#ffe08a'
    ctx.fillRect(px + 1, y + 4, 7, 3)

    px += 18
    ctx.fillStyle = i === parts.length - 1 ? '#0a84ff' : '#1d1d1f'
    ctx.fillText(part, px, y + 15)
    px += ctx.measureText(part).width + 8

    if (i < parts.length - 1) {
      ctx.fillStyle = '#8e8e93'
      ctx.fillText('›', px, y + 15)
      px += 14
    }
  })
}

function drawFolderIcon(ctx: CanvasRenderingContext2D, x: number, y: number, label: string) {
  ctx.fillStyle = '#5ac8fa'
  roundRect(ctx, x, y + 10, 52, 38, 5)
  ctx.fill()
  ctx.fillStyle = '#7ad4ff'
  roundRect(ctx, x + 2, y + 4, 22, 10, 3)
  ctx.fill()
  ctx.fillStyle = '#4bb8f0'
  roundRect(ctx, x, y + 16, 52, 32, 5)
  ctx.fill()

  ctx.fillStyle = '#1d1d1f'
  ctx.font = '600 12px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(label, x + 26, y + 68)
  ctx.textAlign = 'left'
}

function drawDock(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const iconSize = 50
  const gap = 14
  const count = DOCK_APPS.length
  const dockW = count * (iconSize + gap) + 36
  const dockH = 78
  const dx = (w - dockW) / 2
  const dy = h - dockH - 10

  // Taskbar / dock glass
  ctx.fillStyle = 'rgba(30,30,32,0.55)'
  roundRect(ctx, dx, dy, dockW, dockH, 18)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.28)'
  ctx.lineWidth = 1
  roundRect(ctx, dx, dy, dockW, dockH, 18)
  ctx.stroke()

  // label
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.font = '500 11px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Open Apps', w / 2, dy - 8)
  ctx.textAlign = 'left'

  DOCK_APPS.forEach((app, i) => {
    const ix = dx + 20 + i * (iconSize + gap)
    const iy = dy + 10

    ctx.fillStyle = app.color
    roundRect(ctx, ix, iy, iconSize, iconSize, 12)
    ctx.fill()

    ctx.fillStyle = '#ffffff'
    ctx.font = '700 12px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(app.short, ix + iconSize / 2, iy + iconSize / 2 + 4)

    // open indicator
    if (app.open) {
      ctx.beginPath()
      ctx.fillStyle = '#ffffff'
      ctx.arc(ix + iconSize / 2, dy + dockH - 8, 2.6, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.textAlign = 'left'
  })
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
