import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'

let parquetTexture: CanvasTexture | null = null

/**
 * Bone / Canyon Esperanza style — wide pale planks, soft grain, tight seams
 * (matched to the INC 2122 reference look)
 */
export function getParquetTexture() {
  if (parquetTexture) return parquetTexture

  const size = 2048
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  // bone / cream oak — desaturated, airy
  const tones = [
    '#efe8dc',
    '#e9e1d4',
    '#f3ece1',
    '#ebe3d6',
    '#f0e9dd',
    '#e6dece',
    '#f5efe5',
    '#e8e0d3',
  ]

  ctx.fillStyle = '#ebe4d7'
  ctx.fillRect(0, 0, size, size)

  const plankH = 112
  let y = 0
  let row = 0

  while (y < size) {
    let x = row % 2 === 0 ? 0 : -70
    while (x < size + 120) {
      const plankW = 220 + ((row * 13 + Math.floor(x / 80)) % 6) * 28
      const tone = tones[(row * 3 + Math.floor(x / 110)) % tones.length]

      ctx.fillStyle = tone
      ctx.fillRect(x, y, plankW - 1.5, plankH - 1.5)

      // fine linear grain (low contrast)
      ctx.strokeStyle = 'rgba(150, 135, 110, 0.045)'
      ctx.lineWidth = 1
      for (let g = 8; g < plankW - 8; g += 9 + ((row + g) % 5)) {
        ctx.beginPath()
        const gx = x + g
        ctx.moveTo(gx, y + 4)
        ctx.bezierCurveTo(
          gx + 2,
          y + plankH * 0.35,
          gx - 1.5,
          y + plankH * 0.65,
          gx + 1.5,
          y + plankH - 4,
        )
        ctx.stroke()
      }

      // occasional soft knot / swirl
      if ((row + Math.floor(x / 90)) % 7 === 0) {
        const kx = x + plankW * 0.35
        const ky = y + plankH * 0.45
        ctx.strokeStyle = 'rgba(160, 145, 120, 0.07)'
        ctx.beginPath()
        ctx.ellipse(kx, ky, 10, 5, 0.4, 0, Math.PI * 2)
        ctx.stroke()
      }

      // very tight seam (almost seamless)
      ctx.strokeStyle = 'rgba(140, 125, 100, 0.12)'
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(x + plankW - 1, y + 1)
      ctx.lineTo(x + plankW - 1, y + plankH - 2)
      ctx.stroke()

      x += plankW
    }

    // horizontal joint
    ctx.strokeStyle = 'rgba(135, 120, 95, 0.14)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, y + plankH - 1)
    ctx.lineTo(size, y + plankH - 1)
    ctx.stroke()

    y += plankH
    row += 1
  }

  // soft overall lighten / bleach
  ctx.fillStyle = 'rgba(255, 252, 245, 0.12)'
  ctx.fillRect(0, 0, size, size)

  parquetTexture = new CanvasTexture(canvas)
  parquetTexture.colorSpace = SRGBColorSpace
  parquetTexture.wrapS = RepeatWrapping
  parquetTexture.wrapT = RepeatWrapping
  parquetTexture.repeat.set(2.4, 2.4)
  parquetTexture.anisotropy = 16
  parquetTexture.needsUpdate = true
  return parquetTexture
}
