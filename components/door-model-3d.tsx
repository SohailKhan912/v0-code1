"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows, Bounds } from "@react-three/drei"
import { DoorMesh } from "./door-mesh"
import type { DoorConfig } from "./door-configurator"

type Props = { config?: Partial<DoorConfig> }

export default function DoorModel3D({ config }: Props) {
  return (
    <div className="w-full min-h-[520px] h-[600px] bg-gradient-to-b from-gray-100 to-gray-200">
      <Canvas camera={{ position: [3, 1.5, 4], fov: 50 }} shadows dpr={[1,2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10,10,5]} intensity={1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <spotLight position={[-5,5,5]} angle={0.3} intensity={0.5} />

        <Suspense fallback={null}>
          {/*  Auto-fit camera & controls to always keep the door in view */}
          <Bounds fit clip observe margin={1.15}>
            <group key={`${(config as any)?.width}-${(config as any)?.height}`}>
              <DoorMesh config={config as DoorConfig} />
            </group>
          </Bounds>

          <ContactShadows position={[0,-1,0]} opacity={0.4} scale={10} blur={2} far={4} />
          <Environment preset="apartment" />
        </Suspense>

        {/* makeDefault lets Bounds control these */}
        <OrbitControls makeDefault enablePan={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/2} minDistance={3} maxDistance={8} />
      </Canvas>
    </div>
  )
}
