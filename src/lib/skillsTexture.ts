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
  { id: 'messages', name: 'Messages', open: true },
  { id: 'whatsapp', name: 'WhatsApp', open: true },
  { id: 'vscode', name: 'VS Code', open: true },
  { id: 'powerpoint', name: 'PowerPoint', open: true },
  { id: 'calendar', name: 'Calendar', open: true },
  { id: 'spotify', name: 'Spotify', open: true },
] as const

let skillsTexture: CanvasTexture | null = null
let builtWithPhoto = false

export function invalidateSkillsTexture() {
  if (skillsTexture) {
    skillsTexture.dispose()
    skillsTexture = null
  }
  builtWithPhoto = false
}

// ensure HMR picks up new dock icons
invalidateSkillsTexture()

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
  const iconSize = 56
  const gap = 16
  const count = DOCK_APPS.length
  const dockW = count * (iconSize + gap) + 40
  const dockH = 88
  const dx = (w - dockW) / 2
  const dy = h - dockH - 10

  ctx.fillStyle = 'rgba(30,30,32,0.58)'
  roundRect(ctx, dx, dy, dockW, dockH, 20)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.3)'
  ctx.lineWidth = 1
  roundRect(ctx, dx, dy, dockW, dockH, 20)
  ctx.stroke()

  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, Inter, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Open Apps', w / 2, dy - 8)

  DOCK_APPS.forEach((app, i) => {
    const ix = dx + 22 + i * (iconSize + gap)
    const iy = dy + 12
    drawAppIcon(ctx, app.id, ix, iy, iconSize)

    if (app.open) {
      ctx.beginPath()
      ctx.fillStyle = '#ffffff'
      ctx.arc(ix + iconSize / 2, dy + dockH - 9, 2.8, 0, Math.PI * 2)
      ctx.fill()
    }
  })
  ctx.textAlign = 'left'
}

function drawAppIcon(
  ctx: CanvasRenderingContext2D,
  id: (typeof DOCK_APPS)[number]['id'],
  x: number,
  y: number,
  size: number,
) {
  const r = 13
  const cx = x + size / 2
  const cy = y + size / 2

  if (id === 'messages') {
    roundRect(ctx, x, y, size, size, r)
    ctx.fillStyle = '#34c759'
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    roundRect(ctx, cx - 16, cy - 10, 28, 18, 8)
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(cx - 6, cy + 8)
    ctx.lineTo(cx - 2, cy + 8)
    ctx.lineTo(cx - 8, cy + 15)
    ctx.closePath()
    ctx.fill()
    return
  }

  if (id === 'whatsapp') {
    ctx.beginPath()
    ctx.arc(cx, cy, size / 2 - 1, 0, Math.PI * 2)
    ctx.fillStyle = '#25d366'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx, cy - 1, size * 0.28, 0, Math.PI * 2)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3.5
    ctx.stroke()
    // handset
    ctx.beginPath()
    ctx.arc(cx + 2, cy + 2, size * 0.16, 0.2, Math.PI * 1.1)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3.2
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx - 8, cy + 10)
    ctx.quadraticCurveTo(cx - 14, cy + 16, cx - 4, cy + 18)
    ctx.strokeStyle = '#25d366'
    ctx.lineWidth = 6
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx - 8, cy + 10)
    ctx.quadraticCurveTo(cx - 14, cy + 16, cx - 4, cy + 18)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 3
    ctx.stroke()
    return
  }

  if (id === 'vscode') {
    roundRect(ctx, x, y, size, size, r)
    ctx.fillStyle = '#0078d4'
    ctx.fill()
    // ribbon / chevron mark
    ctx.beginPath()
    ctx.moveTo(cx - 14, cy - 14)
    ctx.lineTo(cx + 4, cy)
    ctx.lineTo(cx - 14, cy + 14)
    ctx.lineTo(cx - 8, cy + 14)
    ctx.lineTo(cx + 10, cy)
    ctx.lineTo(cx - 8, cy - 14)
    ctx.closePath()
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.beginPath()
    ctx.moveTo(cx + 8, cy - 16)
    ctx.lineTo(cx + 16, cy - 10)
    ctx.lineTo(cx + 16, cy + 10)
    ctx.lineTo(cx + 8, cy + 16)
    ctx.lineTo(cx + 8, cy + 8)
    ctx.lineTo(cx + 12, cy + 6)
    ctx.lineTo(cx + 12, cy - 6)
    ctx.lineTo(cx + 8, cy - 8)
    ctx.closePath()
    ctx.fill()
    return
  }

  if (id === 'powerpoint') {
    roundRect(ctx, x, y, size, size, r)
    ctx.fillStyle = '#c43e1c'
    ctx.fill()
    // lighter panel
    ctx.fillStyle = '#d24726'
    roundRect(ctx, cx - 2, y + 8, size / 2 - 4, size - 16, 4)
    ctx.fill()
    // orange P tile
    roundRect(ctx, x + 6, cy - 12, 24, 24, 4)
    ctx.fillStyle = '#b7472a'
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('P', x + 18, cy + 6)
    return
  }

  if (id === 'calendar') {
    roundRect(ctx, x, y, size, size, r)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.fillStyle = '#ff3b30'
    roundRect(ctx, x, y, size, 16, r)
    ctx.fill()
    ctx.fillStyle = '#ff3b30'
    ctx.fillRect(x, y + 10, size, 8)
    ctx.fillStyle = '#1d1d1f'
    ctx.font = '800 22px -apple-system, BlinkMacSystemFont, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(String(new Date().getDate()), cx, cy + 14)
    return
  }

  if (id === 'spotify') {
    ctx.beginPath()
    ctx.arc(cx, cy, size / 2 - 1, 0, Math.PI * 2)
    ctx.fillStyle = '#1db954'
    ctx.fill()
    ctx.strokeStyle = '#191414'
    ctx.lineWidth = 3.5
    ctx.lineCap = 'round'
    ;[
      [cy - 6, 14, 0.35],
      [cy + 1, 11, 0.4],
      [cy + 8, 8, 0.45],
    ].forEach(([yy, rw, start]) => {
      ctx.beginPath()
      ctx.arc(cx, yy as number, rw as number, Math.PI * (start as number), Math.PI * (1 - (start as number)))
      ctx.stroke()
    })
  }
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
