export type CoverId =
  | 'island'
  | 'gems'
  | 'home'
  | 'store'
  | 'character'
  | 'football'
  | 'globe'
  | 'office'

function svg(body: string) {
  const markup = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640">${body}</svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup)}`
}

export const COVER_URI: Record<CoverId, string> = {
  island: svg(
    `<rect width="960" height="640" fill="#4ea0d9"/>
     <ellipse cx="480" cy="560" rx="620" ry="180" fill="#2f7eb8"/>
     <ellipse cx="220" cy="390" rx="140" ry="50" fill="#3d8a46"/>
     <ellipse cx="500" cy="360" rx="180" ry="60" fill="#4b9a4e"/>
     <ellipse cx="760" cy="400" rx="120" ry="42" fill="#3d8a46"/>
     <rect x="190" y="250" width="70" height="120" rx="8" fill="#111"/>
     <rect x="200" y="260" width="50" height="36" fill="#7cf0ff"/>
     <text x="480" y="80" text-anchor="middle" fill="#fff" font-size="28" font-family="Arial">WE ISLAND</text>`,
  ),
  gems: svg(
    `<rect width="960" height="640" fill="#14061f"/>
     <circle cx="480" cy="320" r="210" fill="#4a148c"/>
     <polygon points="480,160 600,300 480,480 360,300" fill="#c084fc"/>
     <polygon points="480,160 600,300 480,280" fill="#f5d0fe"/>
     <text x="480" y="80" text-anchor="middle" fill="#fff" font-size="26" font-family="Arial">CRYPTO GEMS</text>`,
  ),
  home: svg(
    `<rect width="960" height="640" fill="#d9cbb8"/>
     <rect x="80" y="80" width="800" height="420" fill="#c7b6a3"/>
     <rect x="120" y="140" width="240" height="160" fill="#eee"/>
     <rect x="420" y="200" width="400" height="220" fill="#b7c4cf"/>
     <rect x="160" y="360" width="180" height="90" fill="#8d6e4c"/>
     <circle cx="800" cy="160" r="18" fill="#fff"/>`,
  ),
  store: svg(
    `<rect width="960" height="640" fill="#f3efe6"/>
     <rect x="60" y="80" width="840" height="480" fill="#e7e0d4"/>
     <rect x="120" y="160" width="200" height="280" fill="#c9a227"/>
     <rect x="380" y="160" width="200" height="280" fill="#c9a227"/>
     <rect x="640" y="160" width="200" height="280" fill="#c9a227"/>
     <rect x="0" y="520" width="960" height="120" fill="#b9b1a3"/>`,
  ),
  character: svg(
    `<rect width="960" height="640" fill="#f6e27a"/>
     <circle cx="480" cy="320" r="170" fill="#ffe566"/>
     <circle cx="420" cy="290" r="16" fill="#222"/>
     <circle cx="540" cy="290" r="16" fill="#222"/>
     <path d="M410 370 Q480 430 550 370" fill="none" stroke="#222" stroke-width="12" stroke-linecap="round"/>`,
  ),
  football: svg(
    `<rect width="960" height="640" fill="#0b1d12"/>
     <rect x="80" y="80" width="800" height="480" fill="#1f7a34"/>
     <rect x="470" y="80" width="20" height="480" fill="#fff"/>
     <circle cx="480" cy="320" r="70" fill="none" stroke="#fff" stroke-width="8"/>
     <rect x="80" y="200" width="90" height="240" fill="none" stroke="#fff" stroke-width="8"/>
     <rect x="790" y="200" width="90" height="240" fill="none" stroke="#fff" stroke-width="8"/>`,
  ),
  globe: svg(
    `<rect width="960" height="640" fill="#0b1c3a"/>
     <circle cx="480" cy="320" r="200" fill="#1d4ed8"/>
     <ellipse cx="480" cy="320" rx="200" ry="70" fill="none" stroke="#93c5fd" stroke-width="10"/>
     <ellipse cx="480" cy="320" rx="70" ry="200" fill="none" stroke="#93c5fd" stroke-width="10"/>
     <path d="M320 260 Q400 220 500 260 T680 250" fill="#22c55e"/>`,
  ),
  office: svg(
    `<rect width="960" height="640" fill="#1e293b"/>
     <rect x="140" y="120" width="680" height="400" fill="#334155"/>
     <rect x="180" y="160" width="160" height="110" fill="#7dd3fc"/>
     <rect x="400" y="160" width="160" height="110" fill="#7dd3fc"/>
     <rect x="620" y="160" width="160" height="110" fill="#7dd3fc"/>
     <rect x="180" y="320" width="600" height="140" fill="#0f172a"/>`,
  ),
}

export function drawCover(ctx: CanvasRenderingContext2D, id: CoverId, width: number, height: number) {
  const paint = (from: string, to: string) => {
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, from)
    gradient.addColorStop(1, to)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  if (id === 'island') {
    paint('#6ec8f0', '#1f6ea5')
    ctx.fillStyle = '#2f8a3a'
    ctx.beginPath()
    ctx.ellipse(width * 0.25, height * 0.62, 90, 32, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.ellipse(width * 0.55, height * 0.55, 120, 40, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#111'
    ctx.fillRect(width * 0.48, height * 0.28, 46, 80)
    ctx.fillStyle = '#7cf0ff'
    ctx.fillRect(width * 0.5, height * 0.31, 30, 22)
    return
  }

  if (id === 'gems') {
    paint('#1a0528', '#6d28d9')
    ctx.fillStyle = '#e9d5ff'
    ctx.beginPath()
    ctx.moveTo(width / 2, height * 0.22)
    ctx.lineTo(width * 0.68, height * 0.5)
    ctx.lineTo(width / 2, height * 0.78)
    ctx.lineTo(width * 0.32, height * 0.5)
    ctx.closePath()
    ctx.fill()
    return
  }

  if (id === 'home') {
    paint('#d8c7b2', '#b39b82')
    ctx.fillStyle = '#ece7df'
    ctx.fillRect(width * 0.12, height * 0.18, width * 0.28, height * 0.28)
    ctx.fillStyle = '#9bb0bf'
    ctx.fillRect(width * 0.48, height * 0.3, width * 0.38, height * 0.36)
    return
  }

  if (id === 'store') {
    paint('#f4efe6', '#d8cbb8')
    ctx.fillStyle = '#c9a227'
    ctx.fillRect(width * 0.12, height * 0.22, width * 0.2, height * 0.48)
    ctx.fillRect(width * 0.4, height * 0.22, width * 0.2, height * 0.48)
    ctx.fillRect(width * 0.68, height * 0.22, width * 0.2, height * 0.48)
    return
  }

  if (id === 'character') {
    paint('#f7e37b', '#f0c94a')
    ctx.fillStyle = '#ffe566'
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, 90, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#222'
    ctx.beginPath()
    ctx.arc(width / 2 - 28, height / 2 - 12, 8, 0, Math.PI * 2)
    ctx.arc(width / 2 + 28, height / 2 - 12, 8, 0, Math.PI * 2)
    ctx.fill()
    return
  }

  if (id === 'football') {
    paint('#14532d', '#166534')
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 8
    ctx.strokeRect(width * 0.08, height * 0.12, width * 0.84, height * 0.76)
    ctx.beginPath()
    ctx.moveTo(width / 2, height * 0.12)
    ctx.lineTo(width / 2, height * 0.88)
    ctx.stroke()
    return
  }

  if (id === 'globe') {
    paint('#0f172a', '#1d4ed8')
    ctx.fillStyle = '#2563eb'
    ctx.beginPath()
    ctx.arc(width / 2, height / 2, 110, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#93c5fd'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.ellipse(width / 2, height / 2, 110, 40, 0, 0, Math.PI * 2)
    ctx.stroke()
    return
  }

  paint('#334155', '#0f172a')
  ctx.fillStyle = '#7dd3fc'
  ctx.fillRect(width * 0.16, height * 0.22, width * 0.2, height * 0.18)
  ctx.fillRect(width * 0.4, height * 0.22, width * 0.2, height * 0.18)
  ctx.fillRect(width * 0.64, height * 0.22, width * 0.2, height * 0.18)
}
