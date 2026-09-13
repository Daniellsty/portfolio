import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { START_LOOK_AT, rig } from '../scroll/rig'

const targetPos = new THREE.Vector3()
const targetLook = new THREE.Vector3()

export function CameraRig() {
  const { camera } = useThree()
  const lookAtRef = useRef(new THREE.Vector3(START_LOOK_AT.x, START_LOOK_AT.y, START_LOOK_AT.z))

  useFrame((_, delta) => {
    targetPos.set(rig.camera.x, rig.camera.y, rig.camera.z)
    targetLook.set(rig.lookAt.x, rig.lookAt.y, rig.lookAt.z)

    // Snappy follow so scroll → forward motion feels direct
    const damp = 1 - Math.exp(-14 * delta)
    camera.position.lerp(targetPos, damp)
    lookAtRef.current.lerp(targetLook, damp)
    camera.lookAt(lookAtRef.current)
  })

  return null
}
