import type { SceneMode, Vec3 } from './rig'
import {
  DESK_CAMERA,
  DESK_LOOK_AT,
  HERO_CAMERA,
  HERO_LOOK_AT,
  START_CAMERA,
  START_LOOK_AT,
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
 * Path: intro wall text above monitor → My Work → skills monitor → about → contact
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
  // First section — read intro text above monitor
  {
    t: 0.14,
    camera: HERO_CAMERA,
    lookAt: HERO_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 1,
    sceneMode: 'room',
    hud: 0,
  },
  // Hold on intro
  {
    t: 0.26,
    camera: { x: -0.55, y: 2.65, z: -0.4 },
    lookAt: HERO_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 1,
    sceneMode: 'room',
    hud: 0,
  },
  // Turn to My Work wall
  {
    t: 0.4,
    camera: WORK_CAMERA,
    lookAt: WORK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 1,
    heroOpacity: 0,
    sceneMode: 'gallery',
    hud: 1,
  },
  // Hold My Work
  {
    t: 0.54,
    camera: { x: 0.45, y: 2.72, z: -0.15 },
    lookAt: WORK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 1,
    heroOpacity: 0,
    sceneMode: 'gallery',
    hud: 1,
  },
  // Zoom into lit monitor skills screen
  {
    t: 0.7,
    camera: DESK_CAMERA,
    lookAt: DESK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'room',
    hud: 0,
  },
  // Hold on skills monitor
  {
    t: 0.82,
    camera: { x: -0.7, y: 1.25, z: -1.35 },
    lookAt: DESK_LOOK_AT,
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'room',
    hud: 0,
  },
  {
    t: 0.92,
    camera: { x: 1.4, y: 1.55, z: 4.5 },
    lookAt: { x: 2.3, y: 1.05, z: 0.2 },
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'about',
    hud: 2,
  },
  {
    t: 1,
    camera: { x: 0.45, y: 1.35, z: 3.2 },
    lookAt: { x: 0.9, y: 0.95, z: -0.2 },
    roomOpacity: 1,
    galleryOpacity: 0,
    heroOpacity: 0,
    sceneMode: 'contact',
    hud: 3,
  },
]

export const SCROLL_PAGES = 10
