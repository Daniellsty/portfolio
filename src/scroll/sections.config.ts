import type { SceneMode, Vec3 } from './rig'
import {
  DESK_CAMERA,
  DESK_LOOK_AT,
  HERO_CAMERA,
  HERO_LOOK_AT,
  PHONE_CAMERA,
  PHONE_LOOK_AT,
  START_CAMERA,
  START_LOOK_AT,
  WINDOW_CAMERA,
  WINDOW_LOOK_AT,
  WORK_CAMERA,
  WORK_LOOK_AT,
} from './rig'

export type CameraKey = {
  t: number
  camera: Vec3
  lookAt: Vec3
  roomOpacity: number
  galleryOpacity: number
  heroOpacity: number
  sceneMode: SceneMode
  hud: number
}

/**
 * intro → My Work → arc around chair → monitor → ocean window → phone zoom → contact
 */
export const CAMERA_KEYS: CameraKey[] = [
  {
    t: 0,
    camera: START_CAMERA,
    lookAt: START_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 1,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.1,
    camera: HERO_CAMERA,
    lookAt: HERO_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 1,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.18,
    camera: { x: -0.7, y: 2.55, z: 0.15 },
    lookAt: HERO_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 1,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.28,
    camera: WORK_CAMERA,
    lookAt: WORK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 1,
    heroOpacity: 0,
    sceneMode: 'gallery',
    hud: 1,
  },
  {
    t: 0.38,
    camera: { x: 0.45, y: 2.72, z: -0.15 },
    lookAt: WORK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 1,
    heroOpacity: 0,
    sceneMode: 'gallery',
    hud: 1,
  },
  // Arc in front of chair (not through it)
  {
    t: 0.48,
    camera: { x: 0.35, y: 1.75, z: 0.85 },
    lookAt: { x: -0.9, y: 1.3, z: -2.5 },
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.56,
    camera: { x: -0.55, y: 1.4, z: 0.05 },
    lookAt: DESK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.64,
    camera: DESK_CAMERA,
    lookAt: DESK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.7,
    camera: { x: -1.2, y: 1.2, z: -1.25 },
    lookAt: DESK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'room',
    hud: 0,
  },
  // Approach window from the RIGHT — frame text + smaller window
  {
    t: 0.76,
    camera: { x: 0.65, y: 2.05, z: 1.55 },
    lookAt: { x: 3.3, y: 2.4, z: 0.35 },
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'about',
    hud: 2,
  },
  {
    t: 0.84,
    camera: WINDOW_CAMERA,
    lookAt: WINDOW_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'about',
    hud: 2,
  },
  {
    t: 0.9,
    camera: { x: 1.45, y: 2.2, z: 1.7 },
    lookAt: { x: 3.45, y: 2.4, z: 0.35 },
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'about',
    hud: 2,
  },
  // Pull from window toward phone on desk
  {
    t: 0.94,
    camera: { x: 0.35, y: 1.45, z: -0.6 },
    lookAt: { x: -0.05, y: 0.9, z: -2.15 },
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'contact',
    hud: 3,
  },
  // Zoom onto iPhone screen
  {
    t: 0.97,
    camera: { x: 0.05, y: 1.18, z: -1.85 },
    lookAt: PHONE_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'contact',
    hud: 3,
  },
  {
    t: 1,
    camera: PHONE_CAMERA,
    lookAt: PHONE_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'contact',
    hud: 3,
  },
]

export const SCROLL_PAGES = 14
