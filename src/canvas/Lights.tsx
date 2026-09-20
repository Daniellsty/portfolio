export function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#e4eaf2" />
      <directionalLight intensity={0.4} position={[-3, 5.5, 2]} color="#d8e2ee" />
      <pointLight intensity={0.35} position={[-1, 2.4, -0.8]} color="#f2f6fb" distance={9} />
      <pointLight intensity={0.28} position={[0.4, 2.0, 0.8]} color="#fff5eb" distance={7} />
    </>
  )
}
