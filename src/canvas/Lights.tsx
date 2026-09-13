export function Lights() {
  return (
    <>
      <ambientLight intensity={0.95} color="#f3efe8" />
      <directionalLight intensity={1.45} position={[5, 8, 3]} color="#fff8ef" />
      <directionalLight intensity={0.35} position={[-4, 4, 1]} color="#e8e4f5" />
      <pointLight intensity={0.4} position={[0.2, 2.2, 0.5]} color="#ffffff" distance={8} />
    </>
  )
}