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

export const START_CAMERA: Vec3 = { x: 0.35, y: 1.85, z: 4.8 }
export const START_LOOK_AT: Vec3 = { x: -0.55, y: 2.7, z: -2.7 }

/** Intro wall text above desk monitor / shelf */
export const HERO_CAMERA: Vec3 = { x: -0.5, y: 2.7, z: -0.2 }
export const HERO_LOOK_AT: Vec3 = { x: -0.7, y: 3.15, z: -3.08 }

/** Left wall / My Work — puzzle frame collage */
export const WORK_CAMERA: Vec3 = { x: 0.55, y: 2.7, z: -0.25 }
export const WORK_LOOK_AT: Vec3 = { x: -3.17, y: 2.7, z: -0.25 }

/** Desk ultrawide monitor — against back wall, left */
export const DESK_CAMERA: Vec3 = { x: -0.7, y: 1.25, z: -1.2 }
export const DESK_LOOK_AT: Vec3 = { x: -0.75, y: 1.26, z: -2.76 }

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
