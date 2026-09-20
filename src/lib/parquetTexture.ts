import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'

let parquetTexture: CanvasTexture | null = null

export function invalidateParquetTexture() {
  if (parquetTexture) {
    parquetTexture.dispose()
    parquetTexture = null
  }
}

invalidateParquetTexture()

/** Brighter light-brown wooden parquet */
export function getParquetTexture() {
  if (parquetTexture) return parquetTexture

  const size = 2048
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const tones = [
    '#f0dcb8',
    '#f5e4c4',
    '#ebd8b0',
    '#f8e8cc',
    '#e8d4b0',
    '#faf0d8',
    '#edd8b4',
    '#e2c89e',
    '#f2e0c0',
    '#e8d6b0',
  ]

  ctx.fillStyle = '#edd8b4'
  ctx.fillRect(0, 0, size, size)

  const plankH = 100
  let y = 0
  let row = 0

  while (y < size) {
    let x = row % 2 === 0 ? 0 : -55
    while (x < size + 120) {
      const plankW = 190 + ((row * 13 + Math.floor(x / 80)) % 6) * 24
      const tone = tones[(row * 3 + Math.floor(x / 100)) % tones.length]

      ctx.fillStyle = tone
      ctx.fillRect(x, y, plankW - 2, plankH - 2)

      ctx.strokeStyle = 'rgba(150, 110, 60, 0.09)'
      ctx.lineWidth = 1.1
      for (let g = 8; g < plankW - 8; g += 11 + ((row + g) % 4)) {
        ctx.beginPath()
        const gx = x + g
        ctx.moveTo(gx, y + 4)
        ctx.bezierCurveTo(
          gx + 3,
          y + plankH * 0.35,
          gx - 2,
          y + plankH * 0.65,
          gx + 2,
          y + plankH - 4,
        )
        ctx.stroke()
      }

      if ((row + Math.floor(x / 85)) % 6 === 0) {
        ctx.strokeStyle = 'rgba(155, 115, 65, 0.1)'
        ctx.beginPath()
        ctx.ellipse(x + plankW * 0.4, y + plankH * 0.5, 12, 5, 0.3, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.strokeStyle = 'rgba(140, 100, 55, 0.18)'
      ctx.lineWidth = 1
      ctx.strokeRect(x + 0.5, y + 0.5, plankW - 2, plankH - 2)

      x += plankW
    }

    y += plankH
    row += 1
  }

  ctx.fillStyle = 'rgba(255, 248, 230, 0.12)'
  ctx.fillRect(0, 0, size, size)

  parquetTexture = new CanvasTexture(canvas)
  parquetTexture.colorSpace = SRGBColorSpace
  parquetTexture.wrapS = RepeatWrapping
  parquetTexture.wrapT = RepeatWrapping
  parquetTexture.repeat.set(3.2, 3.2)
  parquetTexture.anisotropy = 16
  parquetTexture.needsUpdate = true
  return parquetTexture
}
