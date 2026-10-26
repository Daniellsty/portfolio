export function Lights() {
  return (
    <>
      {/* Cool room fill — stays softer so sunlight from the window dominates */}
      <ambientLight intensity={0.38} color="#dfe4ee" />
      <directionalLight intensity={0.22} position={[-3, 5.5, 2]} color="#d8e2ee" />
      <pointLight intensity={0.25} position={[-1, 2.4, -0.8]} color="#f2f6fb" distance={9} />
      <pointLight intensity={0.16} position={[0.4, 2.0, 0.8]} color="#fff5eb" distance={7} />
    </>
  )
}
