export type Vec3 = { x: number; y: number; z: number }
export type SceneMode = 'room' | 'gallery' | 'about' | 'contact'

export type RigState = {
  progress: number
  activeSection: number
  sceneMode: SceneMode
  camera: Vec3
  lookAt: Vec3
  roomOpacity: number
  galleryOpacity: number
  heroOpacity: number
}

/** First load: text + shelf + desk in one frame */
export const START_CAMERA: Vec3 = { x: -0.45, y: 1.95, z: 2.0 }
export const START_LOOK_AT: Vec3 = { x: -0.7, y: 2.0, z: -2.7 }

/** Intro — eye-level then dolly in */
export const HERO_CAMERA: Vec3 = { x: -0.7, y: 2.55, z: 0.95 }
export const HERO_LOOK_AT: Vec3 = { x: -0.7, y: 2.55, z: -3.08 }

/** Left wall / My Work — puzzle frame collage */
export const WORK_CAMERA: Vec3 = { x: 0.55, y: 2.7, z: -0.25 }
export const WORK_LOOK_AT: Vec3 = { x: -3.17, y: 2.7, z: -0.25 }

/** Desk monitor — closer zoom, avoids chair */
export const DESK_CAMERA: Vec3 = { x: -1.22, y: 1.22, z: -1.05 }
export const DESK_LOOK_AT: Vec3 = { x: -1.1, y: 1.16, z: -2.78 }

/** Ocean window — from the RIGHT; text + window in one frame */
export const WINDOW_CAMERA: Vec3 = { x: 1.15, y: 2.15, z: 1.95 }
export const WINDOW_LOOK_AT: Vec3 = { x: 3.4, y: 2.45, z: 0.35 }

/** Desk iPhone — zoom so home screen / icons read clearly */
export const PHONE_CAMERA: Vec3 = { x: -0.02, y: 1.12, z: -1.95 }
export const PHONE_LOOK_AT: Vec3 = { x: -0.08, y: 0.82, z: -2.28 }

export const rig: RigState = {
  progress: 0,
  activeSection: 0,
  sceneMode: 'room',
  camera: { ...START_CAMERA },
  lookAt: { ...START_LOOK_AT },
  roomOpacity: 1,
  galleryOpacity: 0,
  heroOpacity: 1,
}

export function resetRig() {
  rig.progress = 0
  rig.activeSection = 0
  rig.sceneMode = 'room'
  Object.assign(rig.camera, START_CAMERA)
  Object.assign(rig.lookAt, START_LOOK_AT)
  rig.roomOpacity = 1
  rig.galleryOpacity = 0
  rig.heroOpacity = 1
}
