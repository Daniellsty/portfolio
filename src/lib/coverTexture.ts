import { CanvasTexture, SRGBColorSpace } from 'three'
import { drawCover, type CoverId } from './covers'

const cache = new Map<CoverId, CanvasTexture>()

export function getCoverTexture(id: CoverId) {
  const existing = cache.get(id)
  if (existing) return existing

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')
  if (ctx) drawCover(ctx, id, canvas.width, canvas.height)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  cache.set(id, texture)
  return texture
}
